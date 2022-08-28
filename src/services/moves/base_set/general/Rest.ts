import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../Move";

export class Rest extends Move {
    constructor(protected source: Familiar) {
        super(source);
    }

    effect = () => {
        const target = this.source;
        target.adjustStamina(100);
    };
}
