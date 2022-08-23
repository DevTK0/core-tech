import { FamiliarState } from "@/services/battle/FamiliarState";
import { BaseMove } from "../../BaseMove";

export class IceBlast extends BaseMove {

    public power: number = 100;
    public cost: number = 100;

    constructor(
        public source: FamiliarState
    ) {
        super(source);
    }

    effect = () => {
        
        const source = this.source;
        const target = this.targets[0];
        const attack = this.source.getAttack();
        const value = this.power * attack;
        const cost = this.cost;

        console.log("Ice Blast!", value);
        
        target.damage(value);
        source.adjustStamina(-cost);

    }
}