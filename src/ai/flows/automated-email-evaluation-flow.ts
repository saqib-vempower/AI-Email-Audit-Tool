'use server';
/**
 * @fileOverview This file implements a Genkit flow for automatically evaluating advisor emails based on the 10-parameter rubric.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EvaluationParameterSchema = z.object({
  score: z.number(),
  maxScore: z.number(),
  feedback: z.string(),
  isFatal: z.boolean().optional(),
});

const AutomatedEmailEvaluationOutputSchema = z.object({
  overallRating: z.string().describe('Qualitative rating (Excellent, Good, Needs Improvement, Critical).'),
  overallSuggestions: z.string(),
  totalScore: z.number(),
  hasFatalError: z.boolean(),
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
});
export type AutomatedEmailEvaluationOutput = z.infer<
  typeof AutomatedEmailEvaluationOutputSchema
>;

const AutomatedEmailEvaluationInputSchema = z.object({
  emailContent: z.string(),
  schoolGuidelines: z.string().describe('Custom school guidelines to consider alongside the core rubric.'),
});
export type AutomatedEmailEvaluationInput = z.infer<
  typeof AutomatedEmailEvaluationInputSchema
>;

export async function evaluateEmail(
  input: AutomatedEmailEvaluationInput
): Promise<AutomatedEmailEvaluationOutput> {
  return automatedEmailEvaluationFlow(input);
}

const automatedEmailEvaluationPrompt = ai.definePrompt({
  name: 'automatedEmailEvaluationPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: AutomatedEmailEvaluationInputSchema },
  output: { schema: AutomatedEmailEvaluationOutputSchema },
  prompt: `You are an expert evaluator for advisor communications at Excellerate. 
Evaluate the provided 'Email Content' based on the 10-parameter rubric and the provided 'School Guidelines'.

--- CORE RUBRIC ---
1. Polite Greeting & Person-Focused Opening (5 pts)
2. Issue Recognition in First Lines (15 pts)
3. Clear & Easy-to-Follow Structure (10 pts)
4. Grammar, Tone & Empathy (FATAL) (15 pts)
5. Correct Resolution / Policy (FATAL) (15 pts)
6. Clear Next Steps (10 pts)
7. Timelines Set (10 pts)
8. Correct Support Channel (5 pts)
9. Professional Closing & Signature (5 pts)
10. Confidence After Reading (10 pts)

--- SCHOOL GUIDELINES ---
{{{schoolGuidelines}}}

--- EMAIL CONTENT ---
{{{emailContent}}}

Provide specific feedback for each parameter. If parameters 4 or 5 are failed (score < 50%), mark hasFatalError as true.`,
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
