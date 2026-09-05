import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.BETTER_AUTH_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://tamworthhub.co.uk"
    : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL,
  plugins: [adminClient()],
});
