import { testLabels } from "@/shared/utils/testLabels";
import { runSharedTests } from "../shared/updateMenuItem.shared.spec";
import { TestSuitFactory } from "../shared/testSuit.factory";

runSharedTests(testLabels.unitInMemory, TestSuitFactory.createInMemory);