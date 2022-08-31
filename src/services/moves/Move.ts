import { Familiar } from "@/services/battle/Familiar";
import { BattleLogger } from "../battle/BattleLogger";
import { GlobalService } from "../battle/GlobalService";

export abstract class Move {
    public moveName: string = "";

    protected speed: number = 1;
    protected cost: number = 0;
    protected priority: number = 1;
    protected turnLock: number = 0;
    protected cooldown: number = 0;

    protected targets: Familiar[] = [];

    constructor(protected source: Familiar) {
        GlobalService.subscribe("SpeedChange", this.reCalcPriority.bind(this));
    }

    setTargets = (targets: Familiar[]) => {
        this.targets = targets;
        return this;
    };

    reCalcPriority() {
        this.priority = this.source.getSpeed() * this.speed;
    }

    getPriority = () => {
        return this.priority;
    };

    protected abstract setup(target?: Familiar): void;
    protected abstract effect(target?: Familiar): void;
    protected abstract post(history: Move[], target?: Familiar): void;

    setupMove = () => {
        this.targets.forEach((target) => {
            this.setup(target);
        });
    };

    useMove = () => {
        BattleLogger.useMove(this.source.getName(), this.moveName);

        this.targets.forEach((target) => {
            if (target.isEvading()) {
                GlobalService.dispatch("Evade", target);
                BattleLogger.logCondition("Evaded!");
            } else {
                this.effect(target);
            }
        });

        this.source.useStamina(this.cost);

        return this;
    };

    postMove = (history: Move[]) => {
        this.targets.forEach((target) => {
            this.post(history, target);
        });
    };
}
