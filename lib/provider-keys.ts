import { NextResponse } from "next/server";

import { getUserApiKeys } from "@/lib/user-api-keys";

export const getOpenAIKey = async () => {
  const keys = await getUserApiKeys();
  const key = keys?.openaiApiKey.trim() ?? "";

  if (!key) {
    return {
      error: new NextResponse(
        "OpenAI API key is required. Add it in Settings.",
        { status: 400 },
      ),
    } as const;
  }

  return { key } as const;
};

export const getReplicateToken = async () => {
  const keys = await getUserApiKeys();
  const token = keys?.replicateApiToken.trim() ?? "";

  if (!token) {
    return {
      error: new NextResponse(
        "Replicate API token is required. Add it in Settings.",
        { status: 400 },
      ),
    } as const;
  }

  return { token } as const;
};
