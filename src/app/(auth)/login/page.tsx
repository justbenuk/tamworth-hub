import { FieldGroup, Field, FieldDescription } from "@/components/ui/field";
import LoginForm from "@/features/authentication/forms/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Enter your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to enter your account
          </p>
        </div>
        <LoginForm />
        <Field>
          <FieldDescription className="px-6 text-center">
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}
