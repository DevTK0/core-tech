import { BattleLogger } from "@/services/battle/BattleLogger";
import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition, CounterType } from "../Condition";

export class Evading extends Condition {
    conditionName = "Evading";

    constructor(
        protected source: Familiar,
        protected type: CounterType,
        protected count: number
    ) {
        super(source, type, count);
        GlobalService.event.subscribe("Evade", this.applyEffect.bind(this));
    }

    effect() {
        GlobalService.logger.logCondition(
            `${this.source.getName()} evaded the attack!`
        );
    }
}
