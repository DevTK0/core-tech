import { Familiar } from "../battle/Familiar";
import { GlobalService } from "../battle/GlobalService";

export type CounterType = "Charges" | "Turns";

export abstract class Condition {
    protected conditionName: string = "";

    constructor(
        protected source: Familiar,
        protected duration: number = 999,
        protected charges: number = 999
    ) {
        GlobalService.event.subscribe("TurnEnd", () => {
            this.duration--;
            if (this.duration == 0) {
                this.source.removeCondition(this);
            }
        });
    }

    setDuration(duration: number) {
        this.duration = duration;
    }

    setCharges(charges: number) {
        this.charges = charges;
    }

    getDuration() {
        return this.duration;
    }

    getCharges() {
        return this.charges;
    }

    getName() {
        return this.conditionName;
    }

    abstract effect(): void;

    applyEffect(target: Familiar) {
        if (this.source.getId() === target.getId()) {
            this.effect();
            this.charges--;
            if (this.charges == 0) {
                this.source.removeCondition(this);
            } else {
                this.source.updateCondition(this);
            }
        }
    }
}
