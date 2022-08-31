import { GlobalService } from "@/services/battle/GlobalService";
import { Familiar } from "../../battle/Familiar";
import { Condition } from "../Condition";

export class Evading extends Condition {
    conditionName = "Evading";

    constructor(
        protected source: Familiar,
        protected duration: number,
        protected charges: number
    ) {
        super(source, duration, charges);
        GlobalService.subscribe("Evade", this.applyEffect.bind(this));
    }

    effect() {}
}
