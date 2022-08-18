import { Summon } from "./Summon"
import { BaseMove } from "./BaseMove"
import { MoveFactory } from "./MoveFactory"

export class FireBlast extends BaseMove {

    public power: number = 100;

    constructor() {
        super();
    }

    effect = () => {

        const attack = this.source.attack;
        const target = this.targets[0];
        const value = this.power * attack;

        console.log("Fire Blast!", value);
        
        target.damage(value);
    }
}

const move1: BaseMove = MoveFactory.getMove("Fire Blast");
const move2: BaseMove = MoveFactory.getMove("Ice Blast");


const familiar1 = new Summon();
const familiar2 = new Summon();

move1
.setSource(familiar1)
.setTargets([familiar2])
.resolve()
;

move2
.setSource(familiar2)
.setTargets([familiar1])
.resolve()
;