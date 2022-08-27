import { Familiar } from "@/services/battle/Familiar";
import { BaseMove } from "../../BaseMove";
import { BattleLogger } from "@/services/battle/BattleLogger";

export class IceBlast extends BaseMove {
    readonly moveName: string = "Ice Blast";
    protected power: number = 100;
    protected cost: number = 100;
    protected moveSpeed: number = 2;

    constructor(protected source: Familiar) {
        super(source);
    }

    effect = () => {
        const source = this.source;
        const target = this.targets[0];
        const attack = this.source.getAttack();
        const value = this.power * attack;

        BattleLogger.log(`${source.getName()} used ${this.moveName}`);

        target.damage(value);
        source.reduceStamina(this.cost);
    };
}
