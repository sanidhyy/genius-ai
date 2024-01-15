"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Sidebar } from "./sidebar";

type MobileSidebarProps = {
  apiLimitCount: number;
  isPro: boolean;
};

export const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};
