import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { PrismaClient } from "@/lib/generated/prisma/client";

const createPrismaClient = () =>
  new PrismaClient({
    adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
  });

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
