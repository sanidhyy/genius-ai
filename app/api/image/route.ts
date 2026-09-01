import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { aiProviderErrorResponse } from "@/lib/ai-errors";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { getOpenAIKey } from "@/lib/provider-keys";
import { checkSubscription } from "@/lib/subscription";
import { DEFAULT_IMAGE_RESOLUTION, isImageResolution } from "@/constants";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    const body = await req.json();
    const {
      prompt,
      amount = "1",
      resolution = DEFAULT_IMAGE_RESOLUTION,
    } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    const openaiKey = getOpenAIKey(req, userId);
    if ("error" in openaiKey) return openaiKey.error;

    if (!prompt)
      return new NextResponse("Prompt is required.", { status: 400 });

    if (!amount)
      return new NextResponse("Amount is required.", { status: 400 });

    if (!resolution)
      return new NextResponse("Resolution is required.", { status: 400 });

    if (!isImageResolution(resolution))
      return new NextResponse("Invalid resolution.", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 });

    const openai = new OpenAI({
      apiKey: openaiKey.key,
    });

    const response = await openai.images.generate({
      model: "gpt-image-2",
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) await increaseApiLimit();

    console.log({ responseData: response.data });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    return aiProviderErrorResponse(error, "[IMAGE_ERROR]");
  }
}
