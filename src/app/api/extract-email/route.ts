import { NextRequest, NextResponse } from "next/server";
import { extractEmailFromImage } from "@/ai/flows/extract-email-from-image";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image uploaded." },
        { status: 400 }
      );
    }

    // Convert image to buffer
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // Convert to Base64
    const base64 = buffer.toString("base64");

    // Create Data URI
    const imageDataUri = `data:${file.type};base64,${base64}`;

    // Call Gemini Vision Flow
    const result = await extractEmailFromImage({
      imageDataUri,
    });

    return NextResponse.json(result);

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Failed to extract email.",
      },
      {
        status: 500,
      }
    );
  }
}