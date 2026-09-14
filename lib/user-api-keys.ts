import "server-only";

import { cookies } from "next/headers";

import { decrypt, encrypt } from "@/lib/encryption";
import { getSecureCookieName } from "@/lib/utils";

export type UserApiKeys = {
  openaiApiKey: string;
  replicateApiToken: string;
};

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const LEGACY_COOKIE_PREFIXES = [
  "genius-openai-key",
  "genius-replicate-token",
] as const;

function getCookieName() {
  return getSecureCookieName(process.env.AI_SETTINGS_COOKIE_NAME!);
}

function isValidKeys(value: unknown): value is UserApiKeys {
  if (!value || typeof value !== "object") {
    return false;
  }

  const keys = value as Record<string, unknown>;

  return (
    typeof keys.openaiApiKey === "string" &&
    typeof keys.replicateApiToken === "string" &&
    (keys.openaiApiKey.trim().length > 0 ||
      keys.replicateApiToken.trim().length > 0)
  );
}

function deleteLegacyApiKeyCookies(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) {
  for (const cookie of cookieStore.getAll()) {
    const name = cookie.name.startsWith("__Secure-")
      ? cookie.name.slice("__Secure-".length)
      : cookie.name;

    if (LEGACY_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) {
      cookieStore.delete(cookie.name);
    }
  }
}

export async function getUserApiKeys(): Promise<UserApiKeys | null> {
  const cookieStore = await cookies();
  const encrypted = cookieStore.get(getCookieName())?.value.trim() || "";

  if (!encrypted) {
    return null;
  }

  const decrypted = decrypt(encrypted);

  if (!decrypted) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(decrypted);
    return isValidKeys(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function hasUserApiKeys(): Promise<boolean> {
  return (await getUserApiKeys()) !== null;
}

export async function setUserApiKeys(keys: UserApiKeys) {
  const cookieStore = await cookies();
  const encrypted = encrypt(JSON.stringify(keys));

  deleteLegacyApiKeyCookies(cookieStore);

  cookieStore.set(getCookieName(), encrypted, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearUserApiKeys() {
  const cookieStore = await cookies();

  deleteLegacyApiKeyCookies(cookieStore);
  cookieStore.delete(getCookieName());
}
