import { Familiar } from "../battle/Familiar";

export abstract class Condition {
    protected readonly ConditionName: string = "";

    constructor(protected source: Familiar) {}

    getName() {
        return this.ConditionName;
    }

    abstract effect(): void;
}
