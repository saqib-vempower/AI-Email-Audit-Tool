'use server';
/**
 * @fileOverview This file implements the Genkit flow for the Email Analysis Sandbox feature.
 * It allows team leads to paste email text and receive instant evaluation and real-time feedback
 * based on grammar, tone, accuracy, empathy, and compliance.
 *
 * - emailAnalysisSandbox - A function that handles the email analysis process.
 * - EmailAnalysisSandboxInput - The input type for the emailAnalysisSandbox function.
 * - EmailAnalysisSandboxOutput - The return type for the emailAnalysisSandbox function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmailAnalysisSandboxInputSchema = z.object({
  emailText: z.string().describe('The email text to be evaluated.'),
});
export type EmailAnalysisSandboxInput = z.infer<
  typeof EmailAnalysisSandboxInputSchema
>;

const EmailAnalysisSandboxOutputSchema = z.object({
  overallFeedback: z.string().describe('General feedback on the email.'),
  grammarScore: z.number().describe('Score for grammar (0-100).'),
  grammarFeedback: z.string().describe('Specific feedback on grammar.'),
  toneScore: z.number().describe('Score for tone (0-100).'),
  toneFeedback: z.string().describe('Specific feedback on tone.'),
  accuracyScore: z.number().describe('Score for accuracy (0-100).'),
  accuracyFeedback: z.string().describe('Specific feedback on accuracy.'),
  empathyScore: z.number().describe('Score for empathy (0-100).'),
  empathyFeedback: z.string().describe('Specific feedback on empathy.'),
  complianceScore: z.number().describe('Score for compliance (0-100).'),
  complianceFeedback:
    z.string().describe('Specific feedback on compliance based on custom school guidelines. Assume general good practices if no specific guidelines are given.'),
});
export type EmailAnalysisSandboxOutput = z.infer<
  typeof EmailAnalysisSandboxOutputSchema
>;

export async function emailAnalysisSandbox(
  input: EmailAnalysisSandboxInput
): Promise<EmailAnalysisSandboxOutput> {
  return emailAnalysisSandboxFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emailAnalysisSandboxPrompt',
  input: {schema: EmailAnalysisSandboxInputSchema},
  output: {schema: EmailAnalysisSandboxOutputSchema},
  prompt: `You are an AI assistant specialized in evaluating emails for educational advisors. Your task is to provide a comprehensive evaluation of the provided email text based on the following criteria: grammar, tone, accuracy, empathy, and compliance. For each criterion, provide a score from 0 to 100 and specific feedback. Finally, provide overall feedback on the email.

**Custom School Guidelines for Compliance:** Assume general good practices for educational communication compliance, such as avoiding discriminatory language, ensuring privacy of student information, maintaining professionalism, and adhering to school policies.

Evaluate the following email:

Email Text:
{{{emailText}}}`,
});

const emailAnalysisSandboxFlow = ai.defineFlow(
  {
    name: 'emailAnalysisSandboxFlow',
    inputSchema: EmailAnalysisSandboxInputSchema,
    outputSchema: EmailAnalysisSandboxOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
