import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class KnockedOut extends Condition {
    conditionName = "Knocked Out";

    constructor(
        protected source: Familiar,
        protected duration: number,
        protected charges: number
    ) {
        super(source, duration, charges);
    }

    effect() {
        GlobalService.logger.logCondition(
            `${this.source.getName()} was Knocked Out!`
        );
    }
}
