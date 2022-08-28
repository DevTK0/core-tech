import { Familiar } from "../battle/Familiar";

export class Burned {
    readonly ConditionName = "Burned";

    constructor(private source: Familiar) {}
}
