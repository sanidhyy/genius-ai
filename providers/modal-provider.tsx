"use client";

import { ProModal } from "@/components/pro-modal";
import { useHydrated } from "@/hooks/use-hydrated";

export const ModalProvider = () => {
  const isMounted = useHydrated();

  if (!isMounted) return null;

  return <ProModal />;
};
