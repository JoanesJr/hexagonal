import { runSharedTests } from "../shared/deleteRestaurant.shared.spec";
import { makeDepsInMemory } from "../shared/makeDeps";

runSharedTests('nit - InMemory', makeDepsInMemory);