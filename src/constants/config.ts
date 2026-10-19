export const config = {
  appName: "Launchpad",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  authCookieName: "auth-token",
  toastDuration: 4000,
} as const;
