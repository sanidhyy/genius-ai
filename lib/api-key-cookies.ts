import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import { decrypt, encrypt } from "@/lib/encryption";
import { absoluteUrl } from "@/lib/utils";

export const API_KEY_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const OPENAI_COOKIE = "genius-openai-key";
const REPLICATE_COOKIE = "genius-replicate-token";

export const getSecureCookieName = (cookieName: string) => {
  const isSecure = absoluteUrl("").startsWith("https://");
  return isSecure ? `__Secure-${cookieName}` : cookieName;
};

const cookieOptions = () => {
  const isSecure = absoluteUrl("").startsWith("https://");

  return {
    httpOnly: true,
    maxAge: API_KEY_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax" as const,
    secure: isSecure,
  };
};

const openaiCookieName = (userId: string) =>
  getSecureCookieName(`${OPENAI_COOKIE}-${userId}`);

const replicateCookieName = (userId: string) =>
  getSecureCookieName(`${REPLICATE_COOKIE}-${userId}`);

export const getOpenAIKeyFromRequest = (req: NextRequest, userId: string) =>
  decrypt(req.cookies.get(openaiCookieName(userId))?.value ?? "");

export const getReplicateTokenFromRequest = (
  req: NextRequest,
  userId: string,
) => decrypt(req.cookies.get(replicateCookieName(userId))?.value ?? "");

export const getStoredApiKeys = async (userId: string) => {
  const cookieStore = await cookies();

  return {
    openaiApiKey: decrypt(
      cookieStore.get(openaiCookieName(userId))?.value ?? "",
    ),
    replicateApiToken: decrypt(
      cookieStore.get(replicateCookieName(userId))?.value ?? "",
    ),
  };
};

export const setStoredApiKeys = async (
  userId: string,
  {
    openaiApiKey,
    replicateApiToken,
  }: {
    openaiApiKey: string;
    replicateApiToken: string;
  },
) => {
  const cookieStore = await cookies();
  const options = cookieOptions();

  if (openaiApiKey) {
    cookieStore.set(openaiCookieName(userId), encrypt(openaiApiKey), options);
  } else {
    cookieStore.delete(openaiCookieName(userId));
  }

  if (replicateApiToken) {
    cookieStore.set(
      replicateCookieName(userId),
      encrypt(replicateApiToken),
      options,
    );
  } else {
    cookieStore.delete(replicateCookieName(userId));
  }
};

export const clearStoredApiKeys = async (userId: string) => {
  const cookieStore = await cookies();

  cookieStore.delete(openaiCookieName(userId));
  cookieStore.delete(replicateCookieName(userId));
};
