import { FireBlast } from "./familiars/fire/FireBlast";
import { IceBlast } from "./familiars/ice/IceBlast";
import { Swap } from "./general/Swap";
import { Rest } from "./general/Rest";

/**
 * Maps moves to their respective classes.
 * New moves should be added here for visibility in the move factory.
 */
export const Moves = {
    "Fire Blast": FireBlast,
    "Ice Blast": IceBlast,
    Swap: Swap,
    Rest: Rest,
};
