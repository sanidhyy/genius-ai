import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { prompt } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    if (!prompt)
      return new NextResponse("Prompt is required.", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 });

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      },
    );

    if (!isPro) await increaseApiLimit();

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("[MUSIC_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
