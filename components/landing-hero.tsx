"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";


import { CAPABILITIES_TITLE } from "@/constants";
import { CAPABILITIES_TOOLS } from "@/constants";
import { CAPABILITIES_FOOTER } from "@/constants";


export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>{CAPABILITIES_TITLE}</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        <TypewriterComponent
            options={{
              strings: [...CAPABILITIES_TOOLS], // Use the strings constant
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <div className="text-sm md:text-xl font-light text-zinc-400">
        {CAPABILITIES_FOOTER}
      </div>

      <div className="">
        <Button
          variant="premium"
          className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          asChild
        >
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            {ACCESS_TITLE}
          </Link>
        </Button>
      </div>

      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        {ACCESS_FOOTER}
      </div>
    </div>
  );
};