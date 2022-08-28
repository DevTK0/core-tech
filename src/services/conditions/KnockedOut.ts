import { Familiar } from "../battle/Familiar";

export class KnockedOut {
    readonly ConditionName = "Knocked Out";

    constructor(private source: Familiar) {}
}
