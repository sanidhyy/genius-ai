"use client";

import axios from "axios";
import { toast } from "sonner";

export const handleGenerationError = (
  error: unknown,
  onProRequired: () => void,
  redirectToSettings: () => void,
) => {
  if (axios.isAxiosError(error) && error.response?.status === 403) {
    onProRequired();
    return;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = typeof data === "string" && data.trim() ? data : "";

    if (
      status === 400 ||
      status === 401 ||
      status === 402 ||
      status === 429
    ) {
      const displayMessage = message || "Add your API key in Settings.";
      toast.error(displayMessage);

      if (
        /add it in settings|invalid api (key|token)|please check your (key|token)/i.test(
          displayMessage,
        )
      ) {
        redirectToSettings();
      }

      return;
    }
  }

  toast.error("Something went wrong.");
};
