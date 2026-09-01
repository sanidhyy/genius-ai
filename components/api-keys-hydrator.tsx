"use client";

import { useHydrateApiKeys } from "@/hooks/use-api-keys";

export const ApiKeysHydrator = () => {
  useHydrateApiKeys();
  return null;
};
