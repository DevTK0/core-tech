import { Familiar } from "../../battle/Familiar";
import { GlobalService } from "../../battle/GlobalService";
import { BattleLogger } from "../../battle/BattleLogger";
import { Condition } from "../Condition";

export class Undying extends Condition {
    protected readonly ConditionName = "Undying";

    constructor(protected source: Familiar) {
        super(source);
        GlobalService.subscribe("OnDamage", this.effect.bind(this));
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
