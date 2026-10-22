import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import { organization } from "better-auth/plugins";
import { Resend } from "resend";
import ResetPasswordEmail from "../../emails/ResetPasswordEmail";

const baseURL =
  process.env.BETTER_AUTH_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://tamworthhub.co.uk"
    : "http://localhost:3000");

const resend = new Resend(process.env.RESEND_API_KEY);

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
    resetPasswordTokenExpiresIn: 3600,
    revokeSessionsOnPasswordReset: true,
    requireEmailVerification: false,

    sendResetPassword: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: "Tamworth Hub <ben@tamworthhub.co.uk>",
        to: user.email,
        subject: "Reset your Tamworth Hub Password",
        react: ResetPasswordEmail({
          name: user.name,
          resetUrl: url,
        }),
      });
      if (error) {
        console.error("Password reset email failed", error);
        throw new Error("Unable to send password reset email");
      }
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
  },
  session: {
    cookieCache: {
      deferSessionRefresh: true,
      enabled: true,
      maxAge: 60,
    },
  },
  plugins: [admin(), nextCookies(), organization()],
});
