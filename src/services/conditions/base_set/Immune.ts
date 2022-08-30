import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class Immune extends Condition {
    readonly ConditionName = "Immune";

    constructor(protected source: Familiar) {
        super(source);

        // GlobalService.subscribe(")
    }

    effect() {}
}
