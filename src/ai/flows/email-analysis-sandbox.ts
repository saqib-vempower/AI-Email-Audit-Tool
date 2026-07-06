
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
  advisorEmail: z.string().email().describe('The email address of the advisor.'),
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
        email: input.advisorEmail,
        emailId: parseInt(input.advisorCode, 10),
        totalscore: output.totalScore,
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

      return output;
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
1. Polite Greeting & Person-Focused Opening (Weight: 5): Email starts with Hello/Dear + name.
2. Issue Recognition in First Lines (Weight: 15): First paragraph clearly restates the exact reason for contact.
3. Clear & Easy-to-Follow Structure (Weight: 10): Organized into short paragraphs/bullets.
4. Grammar, Tone & Empathy (FATAL) (Weight: 15): Professional, courteous, no blaming.
5. Correct Resolution / Policy (FATAL) (Weight: 15): Accurate info matching policy.
6. Clear Next Steps (Weight: 10): Clearly states required actions.
7. Timelines Set (Weight: 10): Specific timeframes included (e.g., 48 hours).
8. Correct Support Channel (Weight: 5): Shares correct portal section or email.
9. Professional Closing & Signature (Weight: 5): Ends politely with name, role, and team.
10. Confidence After Reading (Weight: 10): Student clearly understands status and next steps.

Advisor EmailID: {{{advisorCode}}}
Advisor Email: {{{advisorEmail}}}
Email Text to Evaluate:
{{{emailText}}}`,
});
