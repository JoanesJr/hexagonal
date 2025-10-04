import { env } from "@/shared/config/env";
import { prisma, prismaTst } from "./client";

export class PrismaClientFactory {
    private static default = prisma;
    private static tst = prismaTst;
    public static get() {
        return env.NODE_ENV == 'test' ? this.tst : this.default;
    }
}