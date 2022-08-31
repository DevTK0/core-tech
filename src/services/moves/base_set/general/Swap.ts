import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../Move";

export class Swap extends Move {
    constructor(protected source: Familiar) {
        super(source);
    }

    setup = () => {};

    effect = (target: Familiar) => {
        this.source.swap(target);
    };

    post = () => {};
}
