import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not configured");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "Tamworth Hub <account@mail.tamworthhub.co.uk>";
