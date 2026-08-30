import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { siteConfig } from "@/config";
import { CrispProvider } from "@/providers/crisp-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toaster-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <CrispProvider />
      <body className={inter.className}>
        <ClerkProvider
          afterSignOutUrl="/"
          appearance={{
            variables: {
              colorPrimary: "#6F5AF6",
            },
            options: {
              logoPlacement: "none",
            },
          }}
        >
          <ModalProvider />
          <ToasterProvider />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
