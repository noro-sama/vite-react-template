"use client";

import { useFormContext, type FieldValues, type FieldPath } from "react-hook-form";

interface FormErrorProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
}

export function FormError<TFieldValues extends FieldValues>({
  name,
}: FormErrorProps<TFieldValues>) {
  const { getFieldState, formState } = useFormContext<TFieldValues>();
  const message = getFieldState(name, formState).error?.message;

  if (typeof message !== "string") return null;
  return (
    <p className="mt-1.5 text-sm text-rose-600" id={`${name}-error`}>
      {message}
    </p>
  );
}
