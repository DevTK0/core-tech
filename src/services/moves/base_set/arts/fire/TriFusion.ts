import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../../Move";
import { ConditionFactory } from "@/services/conditions/ConditionFactory";

export class TriFusion extends Move {
    moveName = "Tri-Fusion";

    protected power: number = 100;
    protected cost: number = 100;
    protected speed: number = 0.5;
    protected turnLock: number = 13;
    protected cooldown: number = 999;

    constructor(protected source: Familiar) {
        super(source);
    }

    setup = () => {};

    effect = (target: Familiar) => {
        target.adjustHealth(0);
        const condition = ConditionFactory.getCondition(
            "Knocked Out",
            target,
            "KO"
        );
        target.addCondition(condition);

        this.source.adjustHealth(this.source.getHealth() + target.getHealth());
        this.source.adjustAttack(this.source.getAttack() + target.getAttack());
        this.source.adjustDefense(
            this.source.getDefense() + target.getDefense()
        );
    };

    post = () => {};
}
