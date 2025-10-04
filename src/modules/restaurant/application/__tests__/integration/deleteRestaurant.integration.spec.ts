import { runSharedTests } from "../shared/createRestaurant.shared.spec";
import { PrismaClientFactory } from "@/infra/prisma/PrismaClientFactory";
import { beforeEach } from "vitest";
import { makeDepsPrisma } from "../shared/makeDeps";
import { testLabels } from "@/shared/utils/testLabels";

beforeEach(async () => {
    const prisma = PrismaClientFactory.get();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
})

runSharedTests(testLabels.integrationPrisma, makeDepsPrisma);