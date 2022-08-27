import { Familiar } from "@/services/battle/Familiar";

export abstract class BaseMove {
    public moveName: string = "";
    protected moveSpeed: number = 1;
    protected targets: Familiar[] = [];
    protected source: Familiar | undefined;
    protected priority?: number;

    constructor(source?: Familiar) {
        this.source = source;
    }

    setSource = (source: Familiar) => {
        this.source = source;
        return this;
    };

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

    resolve = () => {
        this.effect();
        return this;
    };
}
