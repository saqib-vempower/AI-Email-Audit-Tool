import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ticketId } = await req.json();
    console.log(ticketId);

    const domain = process.env.FRESHDESK_DOMAIN!;
    const apiKey = process.env.FRESHDESK_API_KEY!;

    // Fetch ticket details
    const ticketResponse = await fetch(
      
      `https://${domain}.freshdesk.com/api/v2/tickets/${ticketId}`,
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${apiKey}:X`).toString("base64"),
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Status:", ticketResponse.status);

    if (!ticketResponse.ok) {
      const errorText = await ticketResponse.text();
    
      console.log("Freshdesk Error:");
      console.log(errorText);
    
      return NextResponse.json(
        {
          error: errorText,
        },
        {
          status: ticketResponse.status,
        }
      );
    }

    const ticket = await ticketResponse.json();

    // Fetch conversations
    const conversationResponse = await fetch(
      `https://${domain}.freshdesk.com/api/v2/tickets/${ticketId}/conversations`,
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${apiKey}:X`).toString("base64"),
          "Content-Type": "application/json",
        },
      }
    );

    const conversations = await conversationResponse.json();

    let studentEmail =
  ticket.description_text ||
  ticket.description ||
  "";

let advisorResponse = "";

conversations.forEach((conv: any) => {
  if (conv.incoming === false) {
    advisorResponse +=
      (conv.body_text || conv.body || "") + "\n\n";
  }
});

return NextResponse.json({
  studentEmail,
  advisorResponse,
});

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}