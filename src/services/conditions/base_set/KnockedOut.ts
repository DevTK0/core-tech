import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class KnockedOut extends Condition {
    readonly ConditionName = "Knocked Out";

    constructor(protected source: Familiar) {
        super(source);
    }

    effect() {}
}
