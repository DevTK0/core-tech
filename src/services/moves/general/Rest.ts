import { Familiar } from "@/services/battle/Familiar";
import { BaseMove } from "../BaseMove";

export class Rest extends BaseMove {
    constructor(protected source: Familiar) {
        super(source);
    }

    effect = () => {
        const target = this.source;
        target.adjustStamina(100);
    };
}
