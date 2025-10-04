import { testLabels } from "@/shared/utils/testLabels";
import { runSharedTests } from "../shared/createRestaurant.shared.spec";
import { makeDepsInMemory } from "../shared/makeDeps";

runSharedTests(testLabels.unitInMemory, makeDepsInMemory);