"use client";

import {
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormError } from "./FormError";
import { cn } from "@/utils/cn";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

export function SelectField<TFieldValues extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select an option",
  disabled,
}: SelectFieldProps<TFieldValues>) {
  const { register, getFieldState, formState } =
    useFormContext<TFieldValues>();
  const hasError = Boolean(getFieldState(name, formState).error);

  return (
    <div>
      <label
        className="mb-1.5 block text-sm font-medium text-slate-700"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        aria-describedby={hasError ? `${name}-error` : undefined}
        aria-invalid={hasError}
        className={cn(
          "block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 sm:text-sm",
          hasError && "border-rose-500",
        )}
        disabled={disabled}
        id={name}
        {...register(name)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FormError<TFieldValues> name={name} />
    </div>
  );
}
