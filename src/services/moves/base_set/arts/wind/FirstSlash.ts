import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../../Move";

export class FirstSlash extends Move {
    moveName = "First Slash";

    protected power: number = 100;
    protected cost: number = 100;
    protected speed: number = 1;

    constructor(protected source: Familiar) {
        super(source);
    }

    setup = () => {};

    effect = (target: Familiar) => {
        const value = this.power * this.source.getAttack();

        target.damage(value);
    };

    post = () => {};
}
