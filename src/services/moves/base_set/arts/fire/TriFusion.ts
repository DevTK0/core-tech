import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../../Move";
import { BattleLogger } from "@/services/battle/BattleLogger";
import { GlobalService } from "@/services/battle/GlobalService";
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
        const condition = ConditionFactory.getCondition("Knocked Out", target);
        target.addNegativeCondition(condition);

        this.source.adjustHealth(target.getHealth());
        this.source.adjustAttack(target.getAttack());
        this.source.adjustDefense(target.getDefense());
    };

    post = () => {};
}
