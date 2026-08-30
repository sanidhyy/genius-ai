import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => undefined;

export const useHydrated = () =>
  useSyncExternalStore(emptySubscribe, () => true, () => false);
