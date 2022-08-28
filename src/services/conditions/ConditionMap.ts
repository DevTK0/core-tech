import { Burned } from "./base_set/Burned";
import { KnockedOut } from "./base_set/KnockedOut";
import { Undying } from "./base_set/Undying";

/**
 * Maps Conditions to their respective classes.
 * New Conditions should be added here for visibility in the move factory.
 */
export const ConditionMap = {
    Undying: Undying,
    "Knocked Out": KnockedOut,
    Burned: Burned,
};
