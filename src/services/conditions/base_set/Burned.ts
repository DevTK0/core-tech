import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class Burned extends Condition {
    protected readonly ConditionName = "Burned";

    constructor(protected source: Familiar) {
        super(source);
    }

    effect() {}
}
