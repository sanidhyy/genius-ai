import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

import { aiProviderErrorResponse } from "@/lib/ai-errors";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { getReplicateToken } from "@/lib/provider-keys";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    const body = await req.json();
    const { prompt } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    const replicateToken = getReplicateToken(req, userId);
    if ("error" in replicateToken) return replicateToken.error;

    if (!prompt)
      return new NextResponse("Prompt is required.", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 });

    const replicate = new Replicate({
      auth: replicateToken.token,
    });

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
    return aiProviderErrorResponse(error, "[MUSIC_ERROR]", "replicate");
  }
}
