import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/features/Authentication/forms/LoginForm";

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Access your account</CardTitle>
        <CardDescription>
          Enter your information below to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
