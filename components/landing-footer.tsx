"use client";

import Image from "next/image";
import Link from "next/link";

import { FOOTER_LINKS } from "@/constants";

export const LandingFooter = () => {
  return (
    <nav className="p-8 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image src="/logo.png" alt="Genius logo" fill />
        </div>
      </Link>
      <div className="text-white text-[15px]">
        &copy; <span className="font-bold">Genius</span>{" "}
        {new Date().getFullYear()}. All rights reserved.
      </div>

      <div className="flex items-center gap-x-4 text-white">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.link}
            href={link.link}
            target="_blank"
            rel="noreferrer noopener"
            title={link.name}
          >
            <link.icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
    </nav>
  );
};
