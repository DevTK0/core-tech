import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../../Move";
import { BattleLogger } from "@/services/battle/BattleLogger";

export class IceBlast extends Move {
    moveName = "Ice Blast";

    protected power: number = 100;
    protected cost: number = 100;
    protected moveSpeed: number = 2;

    constructor(protected source: Familiar) {
        super(source);
    }

    effect = () => {
        const value = this.power * this.source.getAttack();

        this.targets[0].damage(value);
        this.source.reduceStamina(this.cost);
    };
}
