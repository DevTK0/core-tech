import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../../Move";
import { BattleLogger } from "@/services/battle/BattleLogger";

export class IceBlast extends Move {
    moveName = "Ice Blast";

    protected power: number = 100;
    protected cost: number = 100;
    protected speed: number = 1;

    constructor(protected source: Familiar) {
        super(source);
    }

    effect = (target: Familiar) => {
        const value = this.power * this.source.getAttack();

        target.damage(value);
    };
}
