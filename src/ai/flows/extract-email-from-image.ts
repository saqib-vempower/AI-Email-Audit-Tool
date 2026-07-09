'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExtractEmailFromImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'The uploaded screenshot as a data URI. Example: data:image/png;base64,...'
    ),
});

const ExtractEmailFromImageOutputSchema = z.object({
  emailText: z
    .string()
    .describe('The extracted email conversation from the screenshot.'),
});

export type ExtractEmailFromImageInput = z.infer<
  typeof ExtractEmailFromImageInputSchema
>;

export type ExtractEmailFromImageOutput = z.infer<
  typeof ExtractEmailFromImageOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'extractEmailFromImagePrompt',

  model: 'googleai/gemini-2.5-flash',

  input: {
    schema: ExtractEmailFromImageInputSchema,
  },

  output: {
    schema: ExtractEmailFromImageOutputSchema,
  },

  prompt: `
You are an OCR and email extraction assistant.

Your task is to read the uploaded screenshot carefully.

The screenshot may contain:

- Gmail
- Outlook
- Zendesk
- Freshdesk
- Other email clients

Extract ONLY the email conversation.

Ignore:

- Buttons
- Sidebars
- Menus
- Icons
- Logos
- Profile pictures
- Toolbars
- Advertisements
- Browser UI

Return the conversation exactly as text.

If there are multiple emails, preserve the order.

Format the output like this:

STUDENT EMAIL:

<student email>

ADVISOR RESPONSE:

<advisor response>

If no email conversation exists, return:

"No email conversation found."

Image:

{{media url=imageDataUri}}
`,
});

const extractEmailFromImageFlow = ai.defineFlow(
  {
    name: 'extractEmailFromImageFlow',
    inputSchema: ExtractEmailFromImageInputSchema,
    outputSchema: ExtractEmailFromImageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    if (!output) {
      throw new Error('Failed to extract email from image.');
    }

    return output;
  }
);

export async function extractEmailFromImage(
  input: ExtractEmailFromImageInput
): Promise<ExtractEmailFromImageOutput> {
  return extractEmailFromImageFlow(input);
}