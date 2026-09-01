import { Settings } from "lucide-react";

import { ApiKeysForm } from "@/components/api-keys-form";
import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title="Subscription"
        description="Manage your account subscription."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

      <div className="px-4 lg:px-8 space-y-8">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are currently on a pro plan."
            : "You are currently on a free plan."}
        </div>

        <SubscriptionButton isPro={isPro} />
      </div>

      <Separator className="my-6" />

      <ApiKeysForm />
    </div>
  );
};

export default SettingsPage;
