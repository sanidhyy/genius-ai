import { NextResponse } from "next/server";
import {
  APIError,
  AuthenticationError,
  OpenAIError,
  RateLimitError,
} from "openai";

type AIProvider = "openai" | "replicate";

const getErrorStatus = (error: unknown) => {
  if (error instanceof APIError) return error.status ?? undefined;

  if (typeof error === "object" && error !== null) {
    if ("status" in error && typeof error.status === "number")
      return error.status;

    if (
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null &&
      "status" in error.response &&
      typeof error.response.status === "number"
    )
      return error.response.status;
  }

  return undefined;
};

const isQuotaError = (error: unknown, message: string) => {
  const code = error instanceof APIError ? error.code : null;
  const status = getErrorStatus(error);

  return (
    status === 402 ||
    code === "insufficient_quota" ||
    /insufficient_quota|exceeded your current quota|insufficient.?credit|quota|billing|payment required/i.test(
      message,
    )
  );
};

export const getAISettingsErrorMessage = (
  error: unknown,
  provider: AIProvider = "openai",
): string => {
  const credential = provider === "replicate" ? "API token" : "API key";
  const credentialHint =
    provider === "replicate"
      ? "Please check your token and try again"
      : "Please check your key and try again";

  if (
    error instanceof AuthenticationError ||
    (error instanceof APIError && error.status === 401) ||
    getErrorStatus(error) === 401
  ) {
    return `Invalid ${credential}. ${credentialHint}`;
  }

  if (
    error instanceof RateLimitError ||
    (error instanceof APIError && error.status === 429) ||
    getErrorStatus(error) === 429 ||
    getErrorStatus(error) === 402
  ) {
    const message = error instanceof Error ? error.message : "";

    if (isQuotaError(error, message))
      return "Not enough credits. Please purchase more credits and try again";

    return "Rate limit reached. Please try again in a moment";
  }

  if (error instanceof OpenAIError)
    return error.message || "Failed to verify API key";

  if (error instanceof Error) return error.message;

  return `Failed to verify ${credential}`;
};

export const isAIProviderError = (error: unknown) =>
  error instanceof OpenAIError || getErrorStatus(error) != null;

export const aiProviderErrorResponse = (
  error: unknown,
  logLabel: string,
  provider: AIProvider = "openai",
) => {
  console.error(`${logLabel}: `, error);

  if (isAIProviderError(error)) {
    return new NextResponse(getAISettingsErrorMessage(error, provider), {
      status: 400,
    });
  }

  return new NextResponse("Internal server error.", { status: 500 });
};
