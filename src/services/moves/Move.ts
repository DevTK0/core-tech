import { Familiar } from "@/services/battle/Familiar";
import { BattleLogger } from "../battle/BattleLogger";

export abstract class Move {
    public moveName: string = "";
    protected moveSpeed: number = 1;
    protected targets: Familiar[] = [];
    protected priority?: number;

    constructor(protected source: Familiar) {}

    setTargets = (targets: Familiar[]) => {
        this.targets = targets;
        return this;
    };

    getPriority = () => {
        if (!this.priority) {
            this.priority = this.source!.getSpeed() * this.moveSpeed;
        }

        return this.priority;
    };

    protected abstract effect(): void;

    useMove = () => {
        BattleLogger.useMove(this.source.getName(), this.moveName);
        this.effect();
        return this;
    };
}
