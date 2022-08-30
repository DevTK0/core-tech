import { Familiar } from "@/services/battle/Familiar";
import { BattleLogger } from "../battle/BattleLogger";
import { GlobalService } from "../battle/GlobalService";

export abstract class Move {
    public moveName: string = "";

    protected speed: number = 1;
    protected cost: number = 0;
    protected priority: number = 1;

    protected targets: Familiar[] = [];
    protected negated: boolean = false;

    constructor(protected source: Familiar) {
        GlobalService.subscribe("SpeedChange", this.reCalcPriority.bind(this));
    }

    setTargets = (targets: Familiar[]) => {
        this.targets = targets;
        return this;
    };

    setNegated = () => {
        this.negated = true;
    };

    reCalcPriority() {
        this.priority = this.source.getSpeed() * this.speed;
    }

    getPriority = () => {
        return this.priority;
    };

    protected abstract effect(target?: Familiar): void;

    useMove = () => {
        GlobalService.dispatch("PreMove", this);
        BattleLogger.useMove(this.source.getName(), this.moveName);

        this.targets.forEach((target) => {
            this.effect(target);
        });

        this.source.useStamina(this.cost);

        GlobalService.dispatch("PostMove", this);

        return this;
    };
}
