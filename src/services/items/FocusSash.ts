import { Familiar } from "../battle/Familiar";
import { GlobalService } from "../battle/GlobalService";
import { BattleLogger } from "../battle/BattleLogger";
import { ConditionFactory } from "../conditions/ConditionFactory";

export class FocusSash {
    readonly itemName = "Focus Sash";

    constructor(private source: Familiar) {
        GlobalService.subscribe("TurnStart", this.effect.bind(this));
    }

    effect() {
        BattleLogger.logEffect(this.itemName, "");
        this.source.addConditions("Undying");
        ConditionFactory.getCondition("Undying", this.source);
    }
}
