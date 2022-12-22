import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition, CounterType } from "../Condition";

export class Regenerating extends Condition {
    conditionName = "Regenerating";

    constructor(
        protected source: Familiar,
        protected type: CounterType,
        protected count: number
    ) {
        super(source, type, count);

        GlobalService.event.subscribe("TurnEnd", this.applyEffect.bind(this));
    }

    effect() {
        this.source.heal(1);
    }
}
