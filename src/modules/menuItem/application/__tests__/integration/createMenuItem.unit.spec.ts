import { beforeEach } from "vitest";
import { runSharedTests } from "../shared/createMenuitem.shared.spec";
import { makeDepsPrisma } from "../shared/makeDeps";
import { PrismaClientFactory } from "@/infra/prisma/PrismaClientFactory";
import { testLabels } from "@/shared/utils/testLabels";

beforeEach(async () => {
    const prisma = PrismaClientFactory.get();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
});

runSharedTests(testLabels.integrationPrisma, makeDepsPrisma);