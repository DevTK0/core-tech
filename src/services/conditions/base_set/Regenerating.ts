import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class Regenerating extends Condition {
    conditionName = "Regenerating";

    constructor(
        protected source: Familiar,
        protected duration: number,
        protected charges: number
    ) {
        super(source, duration, charges);

        GlobalService.event.subscribe("TurnEnd", this.applyEffect.bind(this));
    }

    effect() {
        this.source.heal(1);
    }
}
