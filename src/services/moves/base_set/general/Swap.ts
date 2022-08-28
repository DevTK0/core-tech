import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../Move";

export class Swap extends Move {
    constructor(protected source: Familiar) {
        super(source);
    }

    effect = () => {
        const target = this.targets[0];

        this.source.swap(target);
    };
}
