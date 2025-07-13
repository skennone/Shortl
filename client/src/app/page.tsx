"use client";

import { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, Check, Copy, ExternalLink, Link2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { createShortURL } from "./actions";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentLinks, setRecentLinks] = useState([
    {
      original: "https://example.com/very/long/url/that/needs/shortening",
      shortened: "shortl.io/a1b2c3",
    },
    {
      original:
        "https://anotherexample.com/very/long/url/that/needs/shortening",
      shortened: "shortl.io/x7y8z9",
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    try {
      const shortUrl = await createShortURL(url, "guest");
      if (shortUrl) {
        setShortenedUrl(shortUrl);
        setRecentLinks([
          {
            original: url,
            shortened: shortUrl,
          },
          ...recentLinks.slice(0, 4), // Keep only the 5 most recent
        ]);
      } else {
        console.error("Failed to create short URL. Please try again.");
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b w-full sticky top-0 bg-background z-10">
        <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Link2 className="h-6 w-6" />
            <span className="text-xl font-bold">Shortl</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 sm:flex-row w-full"
            >
              <Input
                type="url"
                placeholder="Paste your long URL here"
                className="h-12 sm:flex-1"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Button
                type="submit"
                size="lg"
                className="gap-2 whitespace-nowrap"
                disabled={isLoading}
              >
                {isLoading ? "Shortening..." : "Shorten URL"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {shortenedUrl && (
              <Alert className="mt-4 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="font-medium text-green-800 dark:text-green-300">
                    URL shortened successfully!
                  </AlertDescription>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{shortenedUrl}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(shortenedUrl)}
                    className="h-8 border-green-200 dark:border-green-800"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </Alert>
            )}

            <Card className="mt-4 w-full">
              <CardHeader className="py-4 md:py-6">
                <CardTitle>Recently shortened</CardTitle>
                <CardDescription>
                  Your most recent shortened links appear here.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-0 md:px-6">
                <div className="space-y-4">
                  {recentLinks.map((link, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-3 md:p-4 ${index === 0 && shortenedUrl ? "bg-muted/50 border-primary/20" : ""}`}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="font-medium text-primary">
                            {link.shortened}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {link.original}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 mt-2 sm:mt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(link.shortened)}
                          >
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
                  ))}
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
