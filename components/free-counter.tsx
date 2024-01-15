"use client";

import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";

type FreeCounterProps = {
  apiLimitCount: number;
  isPro: boolean;
};

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  const proModal = useProModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (isPro) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>

            <Progress
              className="h-3 text-white"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
              indicatorColor="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />
          </div>

          <Button
            variant="premium"
            className="w-full"
            onClick={proModal.onOpen}
          >
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
