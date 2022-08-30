import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class Evading extends Condition {
    readonly ConditionName = "Evading";

    constructor(protected source: Familiar) {
        super(source);
        // TBD
    }

    effect() {}
}
