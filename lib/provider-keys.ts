import { type NextRequest, NextResponse } from "next/server";

import {
  OPENAI_KEY_HEADER,
  REPLICATE_TOKEN_HEADER,
} from "@/constants";

export const getOpenAIKey = (req: NextRequest) => {
  const key = req.headers.get(OPENAI_KEY_HEADER)?.trim() ?? "";

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

export const getReplicateToken = (req: NextRequest) => {
  const token = req.headers.get(REPLICATE_TOKEN_HEADER)?.trim() ?? "";

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
