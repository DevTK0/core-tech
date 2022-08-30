import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class Invulnerable extends Condition {
    readonly ConditionName = "Invulnerable";

    constructor(protected source: Familiar) {
        super(source);

        // TBD After implementing Target Class
    }

    effect() {}
}
