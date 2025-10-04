import { runSharedTests } from "../shared/createRestaurant.shared.spec";
import { makeDepsInMemory } from "../shared/makeDeps";

runSharedTests("Unit - InMemory", makeDepsInMemory);
