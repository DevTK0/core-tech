import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition, CounterType } from "../Condition";

export class Invulnerable extends Condition {
    conditionName = "Invulnerable";

    constructor(
        protected source: Familiar,
        protected type: CounterType,
        protected count: number
    ) {
        super(source, type, count);
    }

    effect() {
        GlobalService.logger.logCondition(
            `${this.source.getName()} was invulnerable!`
        );
    }
}
