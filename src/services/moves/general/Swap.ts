import { FamiliarState } from "@/services/battle/FamiliarState";
import { BaseMove } from "../BaseMove"

export class Swap extends BaseMove {

    constructor(
        protected source: FamiliarState
    ) {
        super(source);
    }

    effect = () => {

        const target = this.targets[0];
        
        this.source.swap(target);
    }
}

