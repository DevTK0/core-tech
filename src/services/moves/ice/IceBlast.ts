import { BaseMove } from "../BaseMove";

export class IceBlast extends BaseMove {

    public power: number = 100;

    constructor() {
        super();
    }

    effect = () => {
        
        const attack = this.source.attack;
        const target = this.targets[0];
        const value = this.power * attack;

        console.log("Ice Blast!", value);
        
        target.damage(value);

    }
}
