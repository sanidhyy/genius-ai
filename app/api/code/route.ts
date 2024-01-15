import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const intructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explaination.",
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { messages } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });
    if (!configuration.apiKey)
      return new NextResponse("OpenAI api key not configured.", {
        status: 500,
      });

    if (!messages)
      return new NextResponse("Messages are required.", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [intructionMessage, ...messages],
    });

    if (!isPro) await increaseApiLimit();

    return NextResponse.json(response.data.choices[0].message, { status: 200 });
  } catch (error: unknown) {
    console.error("[CODE_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
