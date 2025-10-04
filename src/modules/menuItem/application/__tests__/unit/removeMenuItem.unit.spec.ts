import { testLabels } from "@/shared/utils/testLabels";
import { makeDepsInMemory } from "../shared/makeDeps";
import { runSharedTests } from "../shared/removeMenuItem.shared.spec";

runSharedTests(testLabels.unitInMemory, makeDepsInMemory);