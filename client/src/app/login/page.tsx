import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Link2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b w-full sticky top-0 bg-background z-10">
        <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Link2 className="h-6 w-6" />
            <span className="text-xl font-bold">Shortl</span>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto py-6 md:py-8">
        <div className="w-full max-w-md mx-auto my-auto">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1 text-center py-4 md:py-6">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to sign in to your account
              </p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-base">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary underline underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" className="h-11" />
                </div>
                <Button className="w-full h-11 text-base">Sign In</Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col p-4 md:p-6 pt-0">
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary underline underline-offset-4 font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-4 md:mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
