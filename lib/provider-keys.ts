import { type NextRequest, NextResponse } from "next/server";

import {
  getOpenAIKeyFromRequest,
  getReplicateTokenFromRequest,
} from "@/lib/api-key-cookies";

export const getOpenAIKey = (req: NextRequest, userId: string) => {
  const key = getOpenAIKeyFromRequest(req, userId);

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

export const getReplicateToken = (req: NextRequest, userId: string) => {
  const token = getReplicateTokenFromRequest(req, userId);

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
