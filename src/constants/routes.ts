export const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  dashboardDetail: (id: string) => `/dashboard/${encodeURIComponent(id)}`,
} as const;
