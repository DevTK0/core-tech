import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../Move";

export class Swap extends Move {
    constructor(protected source: Familiar) {
        super(source);
    }

    effect = (target: Familiar) => {
        this.source.swap(target);
    };
}
