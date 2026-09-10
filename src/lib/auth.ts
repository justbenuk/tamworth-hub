import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { resend, EMAIL_FROM } from "@/lib/email";
import VerifyEmail from "../../emails/verify-email";

const baseURL =
  process.env.BETTER_AUTH_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://tamworthhub.co.uk"
    : "http://localhost:3000");

export const auth = betterAuth({
  baseURL,
  trustedOrigins: [
    baseURL,
    "https://tamworthhub.co.uk",
    "https://www.tamworthhub.co.uk",
    "http://localhost:3000",
  ],
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    cookieCache: {
      deferSessionRefresh: true,
      enabled: true,
      maxAge: 60,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: EMAIL_FROM,
        to: user.email,
        subject: "Verify your email address",
        react: VerifyEmail({
          name: user.name,
          url: url,
        }),
      });
    },
  },
  plugins: [admin(), nextCookies()],
});
