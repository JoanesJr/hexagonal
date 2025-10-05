import { PrismaClientFactory } from "@/infra/prisma/PrismaClientFactory";
import { runSharedTests } from "../shared/removeMenuItem.shared.spec";
import { beforeEach } from "vitest";
import { testLabels } from "@/shared/utils/testLabels";
import { TestSuitFactory } from "../shared/testSuit.factory";

beforeEach(async () => {
    const prisma = PrismaClientFactory.get();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
});

runSharedTests(testLabels.integrationPrisma, TestSuitFactory.createPrisma);