import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition, CounterType } from "../Condition";

export class Burned extends Condition {
    conditionName = "Burned";

    constructor(
        protected source: Familiar,
        protected type: CounterType,
        protected count: number
    ) {
        super(source, type, count);

        GlobalService.event.subscribe("TurnEnd", this.applyEffect.bind(this));
    }

    effect() {
        this.source.damage(1);
        GlobalService.logger.logCondition(
            `${this.source.getName()} took burn damage!`
        );
    }
}
