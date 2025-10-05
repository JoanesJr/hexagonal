import { testLabels } from "@/shared/utils/testLabels";
import { runSharedTests } from "../shared/createRestaurant.shared.spec";
import { TestSuitFactory } from "../shared/testSuit.factory";

runSharedTests(testLabels.unitInMemory, TestSuitFactory.createInMemory);
