import { FireBlast } from "./base_set/arts/fire/FireBlast";
import { IceBlast } from "./base_set/arts/ice/IceBlast";
import { Swap } from "./base_set/general/Swap";
import { Rest } from "./base_set/general/Rest";
import { TriFusion } from "./base_set/arts/fire/TriFusion";

/**
 * Maps moves to their respective classes.
 * New moves should be added here for visibility in the move factory.
 */
export const MoveMap = {
    "Fire Blast": FireBlast,
    "Ice Blast": IceBlast,
    "Tri-Fusion": TriFusion,
    Swap: Swap,
    Rest: Rest,
};
