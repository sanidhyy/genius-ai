"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

import {
  OPENAI_KEY_HEADER,
  REPLICATE_TOKEN_HEADER,
} from "@/constants";
import { decrypt, encrypt } from "@/lib/client-encryption";

const STORAGE_NAME = "genius-ai-api-keys";

let currentUserId: string | null = null;

export const setApiKeysUserId = (userId: string | null) => {
  currentUserId = userId;
};

const encryptedStorage: StateStorage = {
  getItem: async (name) => {
    if (!currentUserId || typeof window === "undefined") return null;

    const value = localStorage.getItem(`${name}:${currentUserId}`);
    if (!value) return null;

    const decrypted = await decrypt(value, currentUserId);
    return decrypted || null;
  },
  setItem: async (name, value) => {
    if (!currentUserId || typeof window === "undefined") return;

    try {
      const encrypted = await encrypt(value, currentUserId);
      localStorage.setItem(`${name}:${currentUserId}`, encrypted);
    } catch (error) {
      console.error("Failed to encrypt API keys:", error);
    }
  },
  removeItem: (name) => {
    if (!currentUserId || typeof window === "undefined") return;
    localStorage.removeItem(`${name}:${currentUserId}`);
  },
};

type ApiKeysState = {
  openaiApiKey: string;
  replicateApiToken: string;
  hasHydrated: boolean;
  setOpenAIKey: (openaiApiKey: string) => void;
  setReplicateToken: (replicateApiToken: string) => void;
  setKeys: (keys: {
    openaiApiKey: string;
    replicateApiToken: string;
  }) => void;
  clearKeys: () => void;
};

export const useApiKeys = create<ApiKeysState>()(
  persist(
    (set) => ({
      openaiApiKey: "",
      replicateApiToken: "",
      hasHydrated: false,
      setOpenAIKey: (openaiApiKey) => set({ openaiApiKey }),
      setReplicateToken: (replicateApiToken) => set({ replicateApiToken }),
      setKeys: ({ openaiApiKey, replicateApiToken }) =>
        set({ openaiApiKey, replicateApiToken }),
      clearKeys: () => {
        set({ openaiApiKey: "", replicateApiToken: "" });
        if (currentUserId && typeof window !== "undefined") {
          localStorage.removeItem(`${STORAGE_NAME}:${currentUserId}`);
        }
      },
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => encryptedStorage),
      skipHydration: true,
      partialize: ({ openaiApiKey, replicateApiToken }) => ({
        openaiApiKey,
        replicateApiToken,
      }),
    },
  ),
);

export const useHydrateApiKeys = () => {
  const { userId } = useAuth();

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      if (!userId) {
        setApiKeysUserId(null);
        useApiKeys.setState({
          openaiApiKey: "",
          replicateApiToken: "",
          hasHydrated: false,
        });
        return;
      }

      useApiKeys.setState({ hasHydrated: false });
      setApiKeysUserId(userId);
      await useApiKeys.persist.rehydrate();
      if (!cancelled) useApiKeys.setState({ hasHydrated: true });
    };

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [userId]);
};

export const getApiKeyHeaders = () => {
  const { openaiApiKey, replicateApiToken } = useApiKeys.getState();
  const headers: Record<string, string> = {};

  if (openaiApiKey) headers[OPENAI_KEY_HEADER] = openaiApiKey;
  if (replicateApiToken) headers[REPLICATE_TOKEN_HEADER] = replicateApiToken;

  return headers;
};

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
    const message =
      typeof data === "string" && data.trim() ? data : "";

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
