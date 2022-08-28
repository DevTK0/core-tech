import { Burned } from "./Burned";
import { KnockedOut } from "./KnockedOut";
import { Undying } from "./Undying";

/**
 * Maps Conditions to their respective classes.
 * New Conditions should be added here for visibility in the move factory.
 */
export const Conditions = {
    Undying: Undying,
    "Knocked Out": KnockedOut,
    Burned: Burned,
};
