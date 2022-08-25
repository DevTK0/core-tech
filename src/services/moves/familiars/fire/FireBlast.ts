import { FamiliarState } from "@/services/battle/FamiliarState";
import { BaseMove } from "../../BaseMove"

export class FireBlast extends BaseMove {

    protected power: number = 100;
    protected cost: number = 100;

    constructor(
        protected source: FamiliarState
    ) {
        super(source);
    }

    effect = () => {

        const source = this.source;
        const target = this.targets[0];
        const attack = this.source.getAttack();
        const value = this.power * attack;
        const cost = this.cost;

        console.log("Fire Blast!", value);
        
        target.damage(value);

        console.log(target.getHealth());

        source.adjustStamina(-cost);
    }
}

