import { Familiar } from "@/services/battle/Familiar";
import { BaseMove } from "../../BaseMove";
import { BattleLogger } from "@/services/battle/BattleLogger";

export class FireBlast extends BaseMove {
    readonly moveName: string = "Fire Blast";
    protected power: number = 100;
    protected cost: number = 100;
    protected moveSpeed: number = 2;

    constructor(protected source: Familiar) {
        super(source);
    }

    effect = () => {
        BattleLogger.logMove(this.source.getName(), this.moveName);

        const value = this.power * this.source.getAttack();

        this.targets[0].damage(value);
        this.source.reduceStamina(this.cost);
    };
}
