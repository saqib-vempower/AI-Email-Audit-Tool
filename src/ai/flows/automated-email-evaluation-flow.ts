'use server';
/**
 * @fileOverview This file implements a Genkit flow for automatically evaluating advisor emails.
 *
 * - evaluateEmail - A function that handles the email evaluation process.
 * - AutomatedEmailEvaluationInput - The input type for the evaluateEmail function.
 * - AutomatedEmailEvaluationOutput - The return type for the evaluateEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AutomatedEmailEvaluationInputSchema = z.object({
  emailContent: z
    .string()
    .describe(
      'The full content of the advisor email to be evaluated, including subject, body, and signature.'
    ),
  schoolGuidelines: z
    .string()
    .describe(
      'A detailed description of the school\'s guidelines for email communication, covering aspects like grammar, tone, accuracy, empathy, and compliance. This will be used as the primary rubric for evaluation.'
    ),
});
export type AutomatedEmailEvaluationInput = z.infer<
  typeof AutomatedEmailEvaluationInputSchema
>;

const AutomatedEmailEvaluationOutputSchema = z.object({
  grammar: z.object({
    score: z
      .number()
      .min(1)
      .max(5)
      .describe('Grammar score (1-5, 5 being excellent).'),
    feedback: z
      .string()
      .describe('Detailed feedback on grammar and spelling.'),
  }),
  tone: z.object({
    score: z
      .number()
      .min(1)
      .max(5)
      .describe('Tone score (1-5, 5 being appropriate and professional).'),
    feedback: z.string().describe('Detailed feedback on the email\'s tone.'),
  }),
  accuracy: z.object({
    score: z
      .number()
      .min(1)
      .max(5)
      .describe('Accuracy score (1-5, 5 being factually correct).'),
    feedback: z
      .string()
      .describe('Detailed feedback on the factual accuracy of the information.'),
  }),
  empathy: z.object({
    score: z
      .number()
      .min(1)
      .max(5)
      .describe('Empathy score (1-5, 5 being highly empathetic).'),
    feedback: z
      .string()
      .describe('Detailed feedback on the level of empathy conveyed.'),
  }),
  compliance: z.object({
    score: z
      .number()
      .min(1)
      .max(5)
      .describe('Compliance score (1-5, 5 being fully compliant).'),
    feedback: z
      .string()
      .describe('Detailed feedback on adherence to school guidelines and policies.'),
  }),
  overallRating: z
    .string()
    .describe('An overall qualitative rating (e.g., Excellent, Good, Needs Improvement).'),
  overallSuggestions: z
    .string()
    .describe('General suggestions for improving email quality.'),
});
export type AutomatedEmailEvaluationOutput = z.infer<
  typeof AutomatedEmailEvaluationOutputSchema
>;

export async function evaluateEmail(
  input: AutomatedEmailEvaluationInput
): Promise<AutomatedEmailEvaluationOutput> {
  return automatedEmailEvaluationFlow(input);
}

const automatedEmailEvaluationPrompt = ai.definePrompt({
  name: 'automatedEmailEvaluationPrompt',
  input: { schema: AutomatedEmailEvaluationInputSchema },
  output: { schema: AutomatedEmailEvaluationOutputSchema },
  prompt: `You are an expert email evaluator for an educational institution. Your task is to rigorously assess advisor emails based on predefined school guidelines.

Evaluate the provided 'Email Content' against the following 'School Guidelines'. For each category (Grammar, Tone, Accuracy, Empathy, Compliance), assign a score from 1 to 5 (where 5 is excellent and 1 is poor) and provide specific, actionable feedback.
Finally, provide an overall qualitative rating and general suggestions for improvement.

--- SCHOOL GUIDELINES ---
{{{schoolGuidelines}}}

--- EMAIL CONTENT TO EVALUATE ---
{{{emailContent}}}

---

Provide the evaluation in the specified JSON format, ensuring all fields are populated.
`,
});

const automatedEmailEvaluationFlow = ai.defineFlow(
  {
    name: 'automatedEmailEvaluationFlow',
    inputSchema: AutomatedEmailEvaluationInputSchema,
    outputSchema: AutomatedEmailEvaluationOutputSchema,
  },
  async (input) => {
    const { output } = await automatedEmailEvaluationPrompt(input);
    return output!;
  }
);
