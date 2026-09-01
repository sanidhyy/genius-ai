import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import OpenAI from "openai";

import { aiProviderErrorResponse } from "@/lib/ai-errors";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { getOpenAIKey } from "@/lib/provider-keys";
import { checkSubscription } from "@/lib/subscription";

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explaination.",
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    const body = await req.json();
    const { messages } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    const openaiKey = getOpenAIKey(req, userId);
    if ("error" in openaiKey) return openaiKey.error;

    if (!messages)
      return new NextResponse("Messages are required.", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 });

    const openai = new OpenAI({
      apiKey: openaiKey.key,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-5.6-sol",
      messages: [instructionMessage, ...messages],
    });

    if (!isPro) await increaseApiLimit();

    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (error: unknown) {
    return aiProviderErrorResponse(error, "[CODE_ERROR]");
  }
}
