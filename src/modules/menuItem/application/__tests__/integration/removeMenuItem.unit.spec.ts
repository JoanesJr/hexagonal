import { PrismaClientFactory } from "@/infra/prisma/PrismaClientFactory";
import { makeDepsPrisma } from "../shared/makeDeps";
import { runSharedTests } from "../shared/removeMenuItem.shared.spec";
import { beforeEach } from "vitest";
import { testLabels } from "@/shared/utils/testLabels";

beforeEach(async () => {
    const prisma = PrismaClientFactory.get();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
});

runSharedTests(testLabels.integrationPrisma, makeDepsPrisma);