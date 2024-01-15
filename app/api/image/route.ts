import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { prompt, amount = "1", resolution = "512x512" } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });
    if (!configuration.apiKey)
      return new NextResponse("OpenAI api key not configured.", {
        status: 500,
      });

    if (!prompt)
      return new NextResponse("Prompt is required.", { status: 400 });

    if (!amount)
      return new NextResponse("Amount is required.", { status: 400 });

    if (!resolution)
      return new NextResponse("Resolution is required.", { status: 400 });

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data.data);
  } catch (error: unknown) {
    console.error("[IMAGE_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
