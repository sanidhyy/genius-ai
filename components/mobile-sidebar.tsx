"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

export const MobileSidebar = () => {
  return (
    <Button size="icon" variant="ghost" className="md:hidden">
      <Menu />
    </Button>
  );
};
