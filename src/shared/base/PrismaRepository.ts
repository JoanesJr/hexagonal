import { PrismaClientFactory } from "@/infra/prisma/PrismaClientFactory";
import { PrismaClient } from "@prisma/client/extension";

export abstract class PrismaRepository {
    protected prisma: PrismaClient;
    constructor() {
        this.prisma = PrismaClientFactory.get();
    }
}