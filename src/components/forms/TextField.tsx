"use client";

import {
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormError } from "./FormError";
import { Input } from "@/components/ui/Input";

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function TextField<TFieldValues extends FieldValues>({
  name,
  label,
  type = "text",
  ...inputProps
}: TextFieldProps<TFieldValues>) {
  const { register, getFieldState, formState } =
    useFormContext<TFieldValues>();
  const hasError = Boolean(getFieldState(name, formState).error);
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        className="mb-1.5 block text-sm font-medium text-slate-700"
        htmlFor={name}
      >
        {label}
      </label>
      <Input
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError}
        id={name}
        type={type}
        {...register(name)}
        {...inputProps}
      />
      <FormError<TFieldValues> name={name} />
    </div>
  );
}
