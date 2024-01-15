"use client";

import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type SubscriptionButtonProps = {
  isPro: boolean;
};

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error: unknown) {
      toast.error("Something went wrong.");
      console.error("[BILLING_ERROR]: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      aria-disabled={isLoading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};
