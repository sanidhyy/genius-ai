import { auth } from "@clerk/nextjs/server";

import { db } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = await auth();

  if (!userId) return false;

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) return false;

  const periodEnd = userSubscription.stripeCurrentPeriodEnd?.getTime();
  const isSubscribed =
    Boolean(userSubscription.stripePriceId) &&
    periodEnd !== undefined &&
    periodEnd + DAY_IN_MS > Date.now();

  return !!isSubscribed;
};
