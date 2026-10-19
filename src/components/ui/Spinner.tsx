import { cn } from "@/utils/cn";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({
  className,
  label = "Loading",
}: SpinnerProps) {
  return (
    <span
      aria-label={label}
      role="status"
      className={cn(
        "inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent",
        className,
      )}
    />
  );
}
