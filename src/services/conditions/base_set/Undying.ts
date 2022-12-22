import { Familiar } from "../../battle/Familiar";
import { GlobalService } from "../../battle/GlobalService";
import { Condition, CounterType } from "../Condition";

export class Undying extends Condition {
    conditionName = "Undying";

    constructor(
        protected source: Familiar,
        protected type: CounterType,
        protected count: number
    ) {
        super(source, type, count);
        GlobalService.event.subscribe("OnDamage", this.applyEffect.bind(this));
    }

    effect() {
        if (this.source.getHealth() <= 0) {
            GlobalService.logger.logCondition(
                `${this.source.getName()}'s health can't drop below 1!`
            );
            this.source.adjustHealth(1);
        }
    }
}
