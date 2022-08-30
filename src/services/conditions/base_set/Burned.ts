import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class Burned extends Condition {
    ConditionName = "Burned";

    constructor(protected source: Familiar) {
        super(source);

        GlobalService.subscribe("TurnEnd", this.applyEffect.bind(this));
    }

    effect() {
        this.source.damage(1);
    }
}
