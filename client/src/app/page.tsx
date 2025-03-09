import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Copy, ExternalLink, Link2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b w-full sticky top-0 bg-background z-10">
        <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Link2 className="h-6 w-6" />
            <span className="text-xl font-bold">Shortl</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center w-full overflow-y-auto">
        <section className="container max-w-screen-xl w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Shorten your links in seconds
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg md:text-xl">
              Create short, memorable links that redirect to your long URLs.
            </p>
          </div>
          <div className="mx-auto mt-6 md:mt-8 w-full max-w-3xl px-4 sm:px-0">
            <div className="flex flex-col gap-2 sm:flex-row w-full">
              <Input
                type="url"
                placeholder="Paste your long URL here"
                className="h-12 sm:flex-1"
              />
              <Button size="lg" className="gap-2 whitespace-nowrap">
                Shorten URL
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <Card className="mt-4 w-full">
              <CardHeader className="py-4 md:py-6">
                <CardTitle>Recently shortened</CardTitle>
                <CardDescription>
                  Your most recent shortened links appear here.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-0 md:px-6">
                <div className="space-y-4">
                  <div className="rounded-lg border p-3 md:p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-medium text-primary">
                          shortl.io/a1b2c3
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          https://example.com/very/long/url/that/needs/shortening
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 mt-2 sm:mt-0">
                        <Button variant="outline" size="sm">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3 md:p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-medium text-primary">
                          shortl.io/x7y8z9
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          https://anotherexample.com/path/to/resource
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 mt-2 sm:mt-0">
                        <Button variant="outline" size="sm">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="py-4 md:py-6">
                <p className="text-sm text-muted-foreground">
                  Register or login to access your full link history.
                </p>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t py-4 w-full bg-background">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shortl. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/contact" className="underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
