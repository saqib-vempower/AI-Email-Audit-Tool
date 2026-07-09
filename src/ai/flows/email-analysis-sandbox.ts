
'use server';
/**
 * @fileOverview This file implements the Genkit flow for the Email Analysis Sandbox feature.
 * It allows team leads to paste email text and receive instant evaluation based on a 10-parameter rubric.
 * Results are automatically stored in the 'audits' Firestore collection using a specific requested format.
 */
import { adminDb } from "@/lib/firebase-admin";
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { FieldValue } from "firebase-admin/firestore";

const EvaluationParameterSchema = z.object({
  score: z.number().describe('Score for this parameter (max weight value).'),
  maxScore: z.number().describe('The weightage/max possible score for this parameter.'),
  feedback: z.string().describe('Detailed feedback explaining the score.'),
  isFatal: z.boolean().optional().describe('Whether this is a fatal parameter.'),
});

const EmailAnalysisSandboxOutputSchema = z.object({
  overallFeedback: z.string().describe('General summary of the email quality.'),
  totalScore: z.number().describe('Weighted sum of all parameter scores (0-100).'),
  department: z.enum(["SST", "SLU", "IM"]),
  advisorName: z.string().describe("Name of the advisor who replied."),
  parameters: z.object({
    politeGreeting: EvaluationParameterSchema,
    issueRecognition: EvaluationParameterSchema,
    structure: EvaluationParameterSchema,
    grammarToneEmpathy: EvaluationParameterSchema,
    correctResolution: EvaluationParameterSchema,
    clearNextSteps: EvaluationParameterSchema,
    timelinesSet: EvaluationParameterSchema,
    supportChannel: EvaluationParameterSchema,
    professionalClosing: EvaluationParameterSchema,
    confidenceAfterReading: EvaluationParameterSchema,
  }),
  hasFatalError: z.boolean().describe('True if any FATAL parameter scored significantly low.'),
});
export type EmailAnalysisSandboxOutput = z.infer<
  typeof EmailAnalysisSandboxOutputSchema
>;

const EmailAnalysisSandboxInputSchema = z.object({
  emailText: z.string(),
  advisorCode: z.string().describe('The 6-digit EmailID/Advisor Code.'),
  department: z.enum(["SST", "SLU", "IM"]),
});
export type EmailAnalysisSandboxInput = z.infer<
  typeof EmailAnalysisSandboxInputSchema
>;

const emailAnalysisSandboxFlow = ai.defineFlow(
  {
    name: 'emailAnalysisSandboxFlow',
    inputSchema: EmailAnalysisSandboxInputSchema,
    outputSchema: EmailAnalysisSandboxOutputSchema,
  },
  async (input) => {
    try {
      console.log('[Genkit] Starting evaluation for EmailID:', input.advisorCode);
      const { output } = await prompt(input);

      if (!output) {
        throw new Error("AI failed to generate a valid response.");
      }

      // Save audit to Firestore in the EXACT format requested
      await adminDb.collection("audits").add({
        Summary: output.overallFeedback,
        createdAt: FieldValue.serverTimestamp(),
      
        department: input.department,

advisorName: output.advisorName,

emailId: parseInt(input.advisorCode, 10),

totalScore: output.totalScore,
       
       
        hasFatalError: output.hasFatalError,
        scores: {
          "Polite Greeting": {
            score: output.parameters.politeGreeting.score,
            max: output.parameters.politeGreeting.maxScore,
          },
          "Issue Recognition": {
            score: output.parameters.issueRecognition.score,
            max: output.parameters.issueRecognition.maxScore,
          },
          "Structure": {
            score: output.parameters.structure.score,
            max: output.parameters.structure.maxScore,
          },
          "Grammar and Tone": {
            score: output.parameters.grammarToneEmpathy.score,
            max: output.parameters.grammarToneEmpathy.maxScore,
          },
          "Resolution": {
            score: output.parameters.correctResolution.score,
            max: output.parameters.correctResolution.maxScore,
          },
          "Next Steps": {
            score: output.parameters.clearNextSteps.score,
            max: output.parameters.clearNextSteps.maxScore,
          },
          "Timelines": {
            score: output.parameters.timelinesSet.score,
            max: output.parameters.timelinesSet.maxScore,
          },
          "Support Channel": {
            score: output.parameters.supportChannel.score,
            max: output.parameters.supportChannel.maxScore,
          },
          "Closing": {
            score: output.parameters.professionalClosing.score,
            max: output.parameters.professionalClosing.maxScore,
          },
          "Confidence": {
            score: output.parameters.confidenceAfterReading.score,
            max: output.parameters.confidenceAfterReading.maxScore,
          },
        },
      });

      return {
        ...output,
        department: input.department,
      };
    } catch (error: any) {
      console.error('[Genkit] Flow execution error:', error);
      throw error;
    }
  }
);

export async function emailAnalysisSandbox(
  input: EmailAnalysisSandboxInput
): Promise<EmailAnalysisSandboxOutput> {
  return emailAnalysisSandboxFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emailAnalysisSandboxPrompt',
  model: 'googleai/gemini-2.5-flash',
  input: { schema: EmailAnalysisSandboxInputSchema },
  output: { schema: EmailAnalysisSandboxOutputSchema },
  prompt: `You are an AI assistant specialized in evaluating emails for educational advisors. 
Evaluate the provided email text strictly against the following 10 parameters. 
--- EVALUATION RUBRIC --- 
1. Polite Greeting & Person-Focused Opening (Weight: 5)

Evaluate whether the email starts with an appropriate greeting and addresses the recipient correctly using the available information.

Scoring:

5/5: Email starts with a professional greeting such as "Hello" or "Dear" followed by the recipient's name (only if the name is available in the conversation).
3/5: A greeting is present but incomplete, generic, or does not include the recipient's name when it is available.
0/5: No greeting is provided when one is expected.

AI Rule: Do not create or assume names. If the recipient's name is not provided, evaluate only whether an appropriate greeting is used.
2. Issue Recognition in First Lines (Weight: 15)

Evaluate whether the opening paragraph clearly identifies and acknowledges the exact reason for the customer's contact.

Scoring:

15/15: The first paragraph clearly restates the customer's issue/request and shows understanding of the reason for contact.
8/15: The issue is partially acknowledged but lacks clarity, accuracy, or appears later in the email.
0/15: The email does not recognize or address the customer's reason for contacting.
3. Clear & Easy-to-Follow Structure (Weight: 10)

Evaluate whether the email is structured clearly and is easy for the recipient to read and understand.

Scoring:

10/10: Information is well organized using short paragraphs, bullet points, or clear sections where appropriate.
5/10: The email is understandable but has unnecessary length, poor formatting, or information is not well organized.
0/10: The email structure is confusing, difficult to follow, or lacks proper organization. 
4. Grammar, Tone & Empathy (FATAL) (Weight: 15)

Evaluate whether the email maintains professional language, correct grammar, empathy, and a respectful tone.

Scoring:

15/15: Email is grammatically correct, professional, empathetic, and does not blame the customer.
8/15: Minor grammar issues or the tone is acceptable but lacks empathy or professionalism.
0/15: Email contains major grammar issues, inappropriate tone, blaming language, or lacks professionalism.

FATAL Rule: If the response is disrespectful, blaming, or highly unprofessional, this criterion should receive 0 regardless of other factors.
5. Correct Resolution / Policy (FATAL) (Weight: 15)

Evaluate whether the provided resolution or information is accurate and aligned with the applicable policy.

Scoring:

15/15: Provides the correct resolution and follows the relevant policy/process.
8/15: Resolution is partially correct but missing important details or contains minor inaccuracies.
0/15: Provides incorrect information, violates policy, or gives a misleading resolution.

FATAL Rule: If incorrect policy information or a wrong resolution is provided, this criterion should receive 0. 
6. Clear Next Steps (Weight: 10)

Evaluate whether the email clearly explains what actions need to be taken next.

Scoring:

10/10: Clearly explains the required actions, responsibilities, or next steps for the recipient.
5/10: Some next steps are mentioned but are incomplete or unclear.
0/10: No next steps are provided when action is required 
7. Timelines Set (Weight: 10): 
Evaluate whether a timeline is provided when the situation requires one.

Scoring:
- 10/10: A clear and appropriate timeline is provided when needed OR the case does not require any timeline.
- 5/10: A timeline is mentioned but is vague (e.g., "soon", "shortly").
- 0/10: A timeline was required but completely missing.
8. Correct Support Channel (Weight: 5)

Evaluate whether the email provides the correct support channel, portal section, or contact method when required.

Scoring:

5/5: Correct support channel, portal section, or email address is provided.
3/5: A support channel is mentioned but lacks clarity or contains minor issues.
0/5: Incorrect support channel is provided or required support channel information is missing.

AI Rule: Do not create or assume portal names, email addresses, or support channels that are not provided.
9. Professional Closing & Signature (Weight: 5)

Evaluate whether the email ends with an appropriate professional closing and signature.

Scoring:

5/5: Ends politely with an appropriate closing and includes available name, role, and team details.
3/5: Closing is present but incomplete or missing some signature details.
0/5: No professional closing or signature is provided when required.

AI Rule: Do not generate names, roles, or team names. Only evaluate information present in the email.
10. Confidence After Reading (Weight: 10)

Evaluate whether the recipient clearly understands the current status, resolution, and required next steps after reading the email.

Scoring:

10/10: Email clearly explains the situation, status, and next steps, leaving no major confusion.
5/10: The email provides some clarity but leaves unanswered questions or uncertainty.
0/10: The recipient would not understand the status, resolution, or what to do next.
Also identify the advisor's email address. 
Also identify the advisor's name. 
The advisor's name is usually found: - in the email signature - after "Regards," - after "Best Regards," - after "Kind Regards," - after "Thanks," - after "Sincerely," - in the From field - near the advisor designation Return ONLY the advisor's name. 
If no advisor name can be identified, return "Unknown". 
Department: {{{department}}} Email Text to Evaluate: {{{emailText}}} 
Evaluate this email according to the quality standards and SOP of the selected departmen.`,
});
