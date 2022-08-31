import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class Burned extends Condition {
    conditionName = "Burned";

    constructor(
        protected source: Familiar,
        protected duration: number,
        protected charges: number
    ) {
        super(source, duration, charges);

        GlobalService.subscribe("TurnEnd", this.applyEffect.bind(this));
    }

    effect() {
        this.source.damage(1);
    }
}
