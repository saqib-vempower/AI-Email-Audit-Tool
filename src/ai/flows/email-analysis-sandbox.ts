'use server';
/**
 * @fileOverview This file implements the Genkit flow for the Email Analysis Sandbox feature.
 * It allows team leads to paste email text and receive instant evaluation based on a 10-parameter rubric.
 * Results are automatically stored in the 'audits' Firestore collection.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {db} from '@/lib/firebase';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';

const EvaluationParameterSchema = z.object({
  score: z.number().describe('Score for this parameter (max weight value).'),
  maxScore: z.number().describe('The weightage/max possible score for this parameter.'),
  feedback: z.string().describe('Detailed feedback explaining the score.'),
  isFatal: z.boolean().optional().describe('Whether this is a fatal parameter (Grammar/Tone or Resolution).'),
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
  emailText: z.string().describe('The email text to be evaluated.'),
});
export type EmailAnalysisSandboxInput = z.infer<
  typeof EmailAnalysisSandboxInputSchema
>;

export async function emailAnalysisSandbox(
  input: EmailAnalysisSandboxInput
): Promise<EmailAnalysisSandboxOutput> {
  return emailAnalysisSandboxFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emailAnalysisSandboxPrompt',
  model: 'googleai/gemini-2.5-flash',
  input: {schema: EmailAnalysisSandboxInputSchema},
  output: {schema: EmailAnalysisSandboxOutputSchema},
  prompt: `You are an AI assistant specialized in evaluating emails for educational advisors at Excellerate. 
Evaluate the provided email text strictly against the following 10 parameters. 

--- EVALUATION RUBRIC ---
1. Polite Greeting & Person-Focused Opening (Weight: 5): Email starts with Hello/Dear + name. Thanks the person and introduces topic. No abrupt starts.
2. Issue Recognition in First Lines (Weight: 15): First paragraph clearly restates the exact reason for contact.
3. Clear & Easy-to-Follow Structure (Weight: 10): Organized into short paragraphs/bullets. One topic per section.
4. Grammar, Tone & Empathy (FATAL) (Weight: 15): No spelling/grammar errors. Professional, courteous, no blaming or sarcasm.
5. Correct Resolution / Policy (FATAL) (Weight: 15): Accurate info matching university policy. No guessing.
6. Clear Next Steps (Weight: 10): Clearly states required actions and who performs them.
7. Timelines Set (Weight: 10): Specific timeframes included (e.g., 48 hours). Avoids "soon" or "later".
8. Correct Support Channel (Weight: 5): Shares correct portal section, email ID, or escalation route.
9. Professional Closing & Signature (Weight: 5): Ends politely with name, role, organization, and team.
10. Confidence After Reading (Weight: 10): Person clearly understands status, next steps, and timelines without needing a follow-up.

--- INSTRUCTIONS ---
- For each parameter, provide a score up to its specified weight.
- Parameters 4 and 5 are FATAL. If they score below 50% of their weight (7.5 pts), set hasFatalError to true.
- Calculate totalScore as the sum of all individual scores.

Email Text to Evaluate:
{{{emailText}}}`,
});

const emailAnalysisSandboxFlow = ai.defineFlow(
  {
    name: 'emailAnalysisSandboxFlow',
    inputSchema: EmailAnalysisSandboxInputSchema,
    outputSchema: EmailAnalysisSandboxOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        throw new Error('AI failed to generate a valid response.');
      }

      // Automatically store in Firestore
      try {
        if (db) {
          await addDoc(collection(db, "audits"), {
            emailText: input.emailText,
            totalScore: output.totalScore,
            hasFatalError: output.hasFatalError,
            overallFeedback: output.overallFeedback,
            parameters: output.parameters,
            timestamp: serverTimestamp(),
            source: 'sandbox-flow'
          });
          console.log("Successfully stored audit in Firestore");
        } else {
          console.warn("Firestore (db) is not initialized. Check environment variables.");
        }
      } catch (dbError) {
        console.error("Failed to store audit in Firestore:", dbError);
        // We don't throw here so the user still gets their result even if DB storage fails
      }

      return output;
    } catch (error: any) {
      console.error('Genkit flow error:', error);
      throw error;
    }
  }
);
