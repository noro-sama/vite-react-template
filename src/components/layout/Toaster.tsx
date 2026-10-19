"use client";

import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/utils/cn";

const variantStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-950",
  error: "border-rose-200 bg-rose-50 text-rose-950",
  info: "border-indigo-200 bg-indigo-50 text-indigo-950",
};

export function Toaster() {
  const toasts = useUIStore((state) => state.toasts);
  const removeToast = useUIStore((state) => state.removeToast);

  return (
    <div
      aria-label="Notifications"
      aria-live="polite"
      className="pointer-events-none fixed right-4 top-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
    >
      {toasts.map((toast) => (
        <section
          className={cn(
            "pointer-events-auto flex items-start justify-between gap-4 rounded-xl border p-4 shadow-lg",
            variantStyles[toast.variant],
          )}
          key={toast.id}
          role={toast.variant === "error" ? "alert" : "status"}
        >
          <div>
            <p className="text-sm font-semibold">{toast.title}</p>
            {toast.description && (
              <p className="mt-1 text-sm opacity-80">{toast.description}</p>
            )}
          </div>
          <button
            aria-label="Dismiss notification"
            className="rounded px-1 text-lg leading-none opacity-60 hover:opacity-100"
            onClick={() => removeToast(toast.id)}
            type="button"
          >
            ×
          </button>
        </section>
      ))}
    </div>
  );
}
