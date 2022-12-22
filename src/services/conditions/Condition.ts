import { Familiar } from "../battle/Familiar";
import { GlobalService } from "../battle/GlobalService";

export type CounterType = "Charges" | "Turns" | "KO";

export abstract class Condition {
    protected conditionName: string = "";

    constructor(
        protected source: Familiar,
        protected type: CounterType,
        protected count: number = 999
    ) {
        GlobalService.event.subscribe("TurnEnd", () => {
            if (type === "Turns") {
                this.count--;
                if (this.count == 0) {
                    this.source.removeCondition(this);
                }
            }
        });
    }

    setDuration(duration: number) {
        this.type = "Turns";
        this.count = duration;
    }

    setCharges(charges: number) {
        this.type = "Charges";
        this.count = charges;
    }

    getCountdownType() {
        return this.type;
    }

    getCountdown() {
        return this.count;
    }

    getName() {
        return this.conditionName;
    }

    abstract effect(): void;

    applyEffect(target: Familiar) {
        if (this.source.getId() === target.getId()) {
            this.effect();
            if (this.type === "Charges") {
                this.count--;
                if (this.count == 0) {
                    this.source.removeCondition(this);
                } else {
                    this.source.updateCondition(this);
                }
            }
        }
    }
}
