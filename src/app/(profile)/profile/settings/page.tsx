import ThemeSwitcher from "@/components/Shared/ThemeSwitcher";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <>
      <Card className="flex flex-row items-center justify-between">
        <CardHeader className="flex-1">
          <CardTitle className="font-semibold text-xl">Theme</CardTitle>
          <CardDescription>Manage your theme</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSwitcher />
        </CardContent>
      </Card>
    </>
  );
}
