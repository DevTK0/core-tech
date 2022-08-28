import { BattleLogger } from "@/services/battle/BattleLogger";
import { Familiar } from "@/services/battle/Familiar";
import { GlobalService } from "@/services/battle/GlobalService";

import { ConditionFactory } from "../../conditions/ConditionFactory";
import { Item } from "../Item";

export class FocusSash extends Item {
    itemName = "Focus Sash";

    constructor(protected source: Familiar) {
        super(source);
        GlobalService.subscribe("TurnStart", this.triggerEffect.bind(this));
    }

    effect() {
        const condition = ConditionFactory.getCondition("Undying", this.source);
        this.source.addCondition(condition);
    }
}
