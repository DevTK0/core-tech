import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../Move";

export class Rest extends Move {
    constructor(protected source: Familiar) {
        super(source);
    }

    setup = () => {};

    effect = () => {
        this.source.gainStamina(100);
    };

    post = () => {};
}
