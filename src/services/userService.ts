import { http } from "@/lib/api/http";
import type { LoginInput, LoginResponse } from "@/types/user";

export const userService = {
  login: (input: LoginInput) =>
    http.post<LoginResponse, LoginInput>("/api/auth/login", input),
};
