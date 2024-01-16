import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 h-full">
      <Link href="/dashboard" className="flex items-center">
        <div className="relative w-8 h-8 mr-4">
          <Image src="/logo.png" alt="Genius logo" fill />
        </div>

        <h1 className={cn("text-2xl font-bold", montserrat.className)}>
          Genius
        </h1>
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;
