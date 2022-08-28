import { FireBlast } from "./base_set/familiars/fire/FireBlast";
import { IceBlast } from "./base_set/familiars/ice/IceBlast";
import { Swap } from "./base_set/general/Swap";
import { Rest } from "./base_set/general/Rest";

/**
 * Maps moves to their respective classes.
 * New moves should be added here for visibility in the move factory.
 */
export const MoveMap = {
    "Fire Blast": FireBlast,
    "Ice Blast": IceBlast,
    Swap: Swap,
    Rest: Rest,
};
