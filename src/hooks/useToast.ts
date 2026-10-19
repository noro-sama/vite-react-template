"use client";

import { useCallback } from "react";
import { config } from "@/constants/config";
import {
  useUIStore,
  type ToastVariant,
} from "@/store/useUIStore";

export function useToast() {
  const addToast = useUIStore((state) => state.addToast);
  const removeToast = useUIStore((state) => state.removeToast);

  const show = useCallback(
    (
      variant: ToastVariant,
      title: string,
      description?: string,
    ) => {
      const id = crypto.randomUUID();
      addToast({ id, title, description, variant });
      window.setTimeout(() => removeToast(id), config.toastDuration);
    },
    [addToast, removeToast],
  );

  return {
    show,
    success: (title: string, description?: string) =>
      show("success", title, description),
    error: (title: string, description?: string) =>
      show("error", title, description),
    info: (title: string, description?: string) =>
      show("info", title, description),
  };
}
