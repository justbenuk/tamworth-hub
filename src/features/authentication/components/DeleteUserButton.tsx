import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DeleteUserButton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete</CardTitle>
        <CardDescription>Delete your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            This action can not be reversed (Curreently Unavailable)
          </div>
          <Button variant={"destructive"} disabled>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
