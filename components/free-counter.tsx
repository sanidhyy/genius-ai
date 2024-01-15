"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/config";

type FreeCounterProps = {
  apiLimitCount: number;
};

export const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
