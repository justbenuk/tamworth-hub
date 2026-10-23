import z from "zod";
import { ContactStatus, ContactType } from "@prisma/client/index-browser";

export const ContactSchema = z.object({
  type: z.enum(ContactType),
  name: z.string().min(1, "Please provide your name"),
  email: z.email("Please provide your email"),
  subject: z.string().optional(),
  message: z.string().min(1, "How can we help"),
  pageUrl: z.string().optional(),
  status: z.enum(ContactStatus),
});
