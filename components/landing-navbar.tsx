"use client";

import { useAuth } from "@clerk/nextjs";
import { Github } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { links } from "@/config";
import { cn } from "@/lib/utils";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image src="/logo.png" alt="Genius logo" fill />
        </div>

        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Genius
        </h1>
      </Link>

      <div className="flex items-center gap-x-2">
        <Button variant="outline" className="rounded-full" asChild>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>Get Started</Link>
        </Button>

        <Button className="rounded-full" asChild>
          <Link
            href={links.sourceCode}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Github className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </nav>
  );
};
