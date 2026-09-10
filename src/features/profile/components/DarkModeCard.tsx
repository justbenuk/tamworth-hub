"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Monitor } from "lucide-react";

export default function DarkModeCard() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dark Mode</CardTitle>
        <CardDescription>Set your preferred theme</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setTheme("light")}
            disabled={theme === "light"}
            className="flex flex-col items-center justify-center border p-4 rounded-2xl disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Monitor className="size-20" />
            <span>Light Theme</span>
          </button>
          <button
            onClick={() => setTheme("dark")}
            disabled={theme === "dark"}
            className="flex flex-col items-center justify-center border p-4 rounded-2xl disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Monitor className="size-20" />
            <span>Dark Theme</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
