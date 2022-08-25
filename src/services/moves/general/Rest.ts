import { FamiliarState } from "@/services/battle/FamiliarState";
import { BaseMove } from "../BaseMove"

export class Rest extends BaseMove {

    constructor(
        protected source: FamiliarState
    ) {
        super(source);
    }

    effect = () => {

        const target = this.source;
        target.adjustStamina(100);
    }
}

