import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChangePasswordForm from "../forms/ChangePasswordForm";

export default function ChangePasswordCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change your password</CardTitle>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
