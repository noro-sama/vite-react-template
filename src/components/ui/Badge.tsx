import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type BadgeVariant = "neutral" | "success" | "warning" | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-slate-100 text-slate-700",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-800 ring-amber-600/20",
  info: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-current/10",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
