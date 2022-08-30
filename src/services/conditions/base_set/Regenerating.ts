import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class Regenerating extends Condition {
    readonly ConditionName = "Regenerating";

    constructor(protected source: Familiar) {
        super(source);

        GlobalService.subscribe("TurnEnd", this.applyEffect.bind(this));
    }

    effect() {
        this.source.heal(1);
    }
}
