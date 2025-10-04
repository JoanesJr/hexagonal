import { beforeEach } from "vitest";
import { makeDepsPrisma } from "../shared/makeDeps";
import { runSharedTests } from "../shared/updateMenuItem.shared.spec";
import { PrismaClientFactory } from "@/infra/prisma/PrismaClientFactory";
import { testLabels } from "@/shared/utils/testLabels";

beforeEach(async () => {
    const prisma = PrismaClientFactory.get();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
});
runSharedTests(testLabels.integrationPrisma, makeDepsPrisma);