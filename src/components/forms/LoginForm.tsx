"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form } from "@/components/forms/Form";
import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/Button";
import { routes } from "@/constants/routes";
import { useToast } from "@/hooks/useToast";
import { ApiError } from "@/lib/api/http";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/store/useAuthStore";
import { loginSchema, type LoginFormValues } from "@/utils/validators";

export function LoginForm() {
  const router = useRouter();
  const showToast = useToast();
  const setToken = useAuthStore((state) => state.setToken);
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { user, token } = await userService.login(values);
      setToken(token);
      showToast.success("Welcome back", `Signed in as ${user.email}.`);
      router.push(routes.dashboardDetail("starter"));
      router.refresh();
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : error instanceof Error
            ? error.message
            : "Sign in failed. Please try again.";
      showToast.error("Unable to sign in", message);
    }
  };

  return (
    <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold text-indigo-600">Welcome back</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          Sign in to Launchpad
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Use any valid email and a password of at least 8 characters. This
          starter signs in through a local demo endpoint.
        </p>
      </div>
      <Form className="space-y-5" methods={methods} onSubmit={onSubmit}>
        <TextField<LoginFormValues>
          autoComplete="email"
          label="Email address"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
        <TextField<LoginFormValues>
          autoComplete="current-password"
          label="Password"
          name="password"
          placeholder="At least 8 characters"
          type="password"
        />
        <Button
          className="w-full"
          loading={methods.formState.isSubmitting}
          type="submit"
        >
          Sign in
        </Button>
      </Form>
      <p className="mt-6 text-center text-sm text-slate-500">
        <Link className="font-medium text-indigo-600 hover:text-indigo-500" href={routes.home}>
          Back to home
        </Link>
      </p>
    </section>
  );
}
