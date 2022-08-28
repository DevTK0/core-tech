import { Familiar } from "../../battle/Familiar";
import { GlobalService } from "../../battle/GlobalService";
import { BattleLogger } from "../../battle/BattleLogger";
import { Condition } from "../Condition";

export class Undying extends Condition {
    conditionName = "Undying";

    constructor(
        protected source: Familiar,
        protected duration: number,
        protected charges: number
    ) {
        super(source, duration, charges);
        GlobalService.subscribe("OnDamage", this.applyEffect.bind(this));
    }

    effect() {
        if (this.source.getHealth() <= 0) {
            BattleLogger.logCondition(
                `${this.source.getName()}'s health can't drop below 1!`
            );
            this.source.adjustHealth(1);
        }
    }
}
