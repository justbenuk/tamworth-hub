import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/forms/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm md:max-w-4xl">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2 gap-6">
            <LoginForm />
          </CardContent>
        </Card>
        <p className=" text-xs px-6 text-center">By clicking continue, you agree to our <Link href='/' className="font-semibold underline">Terms Of Service</Link> and <Link href='/' className="font-semibold underline">Privacy Policy</Link></p>
      </div>
    </div>
  )
}

