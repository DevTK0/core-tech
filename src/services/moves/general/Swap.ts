import { Familiar } from "@/services/battle/Familiar";
import { BaseMove } from "../BaseMove";

export class Swap extends BaseMove {
    constructor(protected source: Familiar) {
        super(source);
    }

    effect = () => {
        const target = this.targets[0];

        this.source.swap(target);
    };
}
