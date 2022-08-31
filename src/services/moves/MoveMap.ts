import { FireBlast } from "./base_set/arts/fire/FireBlast";
import { IceBlast } from "./base_set/arts/ice/IceBlast";
import { Swap } from "./base_set/general/Swap";
import { Rest } from "./base_set/general/Rest";
import { TriFusion } from "./base_set/arts/fire/TriFusion";
import { TriSlash } from "./base_set/arts/wind/TriSlash";
import { FirstSlash } from "./base_set/arts/wind/FirstSlash";
import { SecondSlash } from "./base_set/arts/wind/SecondSlash";
import { ThirdSlash } from "./base_set/arts/wind/ThirdSlash";

/**
 * Maps moves to their respective classes.
 * New moves should be added here for visibility in the move factory.
 */
export const MoveMap = {
    "Fire Blast": FireBlast,
    "Ice Blast": IceBlast,
    "Tri-Fusion": TriFusion,
    "Tri Slash": TriSlash,
    "First Slash": FirstSlash,
    "Second Slash": SecondSlash,
    "Third Slash": ThirdSlash,
    Swap: Swap,
    Rest: Rest,
};
