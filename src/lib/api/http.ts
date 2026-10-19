import { config } from "@/constants/config";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiErrorPayload } from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body" | "headers" | "method"> & {
  headers?: HeadersInit;
};

async function request<TResponse, TBody = never>(
  method: string,
  path: string,
  body?: TBody,
  options: RequestOptions = {},
): Promise<TResponse> {
  const headers = new Headers(options.headers);
  const token = useAuthStore.getState().token;

  if (body !== undefined) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const url = config.apiBaseUrl
    ? `${config.apiBaseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`
    : path.startsWith("/")
      ? path
      : `/${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      method,
      headers,
      credentials: options.credentials ?? "include",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to reach the server.";
    throw new ApiError(message, 0);
  }

  const responseText = await response.text();
  let data: unknown;
  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      if (!response.ok) {
        throw new ApiError(responseText, response.status);
      }
      throw new ApiError("The server returned an invalid JSON response.", response.status);
    }
  }

  if (!response.ok) {
    const payload = data as ApiErrorPayload | undefined;
    throw new ApiError(
      payload?.message ?? payload?.error ?? response.statusText ?? "Request failed.",
      response.status,
    );
  }

  return data as TResponse;
}

export const http = {
  get: <TResponse>(path: string, options?: RequestOptions) =>
    request<TResponse>("GET", path, undefined, options),
  post: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ) => request<TResponse, TBody>("POST", path, body, options),
  put: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ) => request<TResponse, TBody>("PUT", path, body, options),
  patch: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ) => request<TResponse, TBody>("PATCH", path, body, options),
  delete: <TResponse>(path: string, options?: RequestOptions) =>
    request<TResponse>("DELETE", path, undefined, options),
};
