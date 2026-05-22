import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

type ChatRequestBody = {
  message?: string;
};

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        {
          status: 400,
        }
      );
    }

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    return NextResponse.json({ text: response.text ?? "" });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      {
        status: 500,
      }
    );
  }
}
