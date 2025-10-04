// src/infra/prisma/client.ts
import { env } from "@/shared/config/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
    datasources: {
        db: {
            url: env.DATABASE_URL
        }
    }
});

export const prismaTst = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
    datasources: {
        db: {
            url: env.DATABASE_URL_TEST
        }
    }
});