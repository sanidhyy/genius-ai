import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { getAISettingsErrorMessage } from "@/lib/ai-errors";
import {
  clearStoredApiKeys,
  getStoredApiKeys,
  setStoredApiKeys,
} from "@/lib/api-key-cookies";
import { apiKeysFormSchema } from "@/schemas";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    const keys = await getStoredApiKeys(userId);
    return NextResponse.json(keys, { status: 200 });
  } catch (error: unknown) {
    console.error("[SETTINGS_KEYS_GET_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    const body = await req.json();
    const parsed = apiKeysFormSchema.safeParse(body);

    if (!parsed.success) {
      return new NextResponse(
        parsed.error.issues[0]?.message ?? "Invalid API key!",
        { status: 400 },
      );
    }

    const { openaiApiKey, replicateApiToken } = parsed.data;

    if (openaiApiKey) {
      const openai = new OpenAI({ apiKey: openaiApiKey });

      try {
        const completion = await openai.chat.completions.create({
          max_completion_tokens: 5,
          messages: [{ content: "hi", role: "user" }],
          model: "gpt-4o-mini",
        });

        if (!completion.choices[0]?.message?.content)
          throw new Error("No response from API");
      } catch (error) {
        console.error(error);
        return new NextResponse(getAISettingsErrorMessage(error), {
          status: 400,
        });
      }
    }

    if (replicateApiToken) {
      const response = await fetch("https://api.replicate.com/v1/account", {
        headers: { Authorization: `Bearer ${replicateApiToken}` },
      });

      if (!response.ok) {
        const text = await response.text();
        const error = Object.assign(new Error(text), {
          status: response.status,
        });

        return new NextResponse(getAISettingsErrorMessage(error, "replicate"), {
          status: 400,
        });
      }
    }

    await setStoredApiKeys(userId, { openaiApiKey, replicateApiToken });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error("[SETTINGS_KEYS_POST_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    await clearStoredApiKeys(userId);
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error("[SETTINGS_KEYS_DELETE_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
