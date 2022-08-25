import { FamiliarState } from "@/services/battle/FamiliarState";

export abstract class BaseMove {
    
    protected targets: FamiliarState[] = [];
    protected source: FamiliarState | undefined;
    protected priority: number = 1;

    constructor(
        source?: FamiliarState
    ) { 
        this.source = source;
    }

    setSource = (source: FamiliarState) => {
        this.source = source;
        return this;
    }

    setTargets = (targets: FamiliarState[]) => {
        this.targets = targets;
        return this;
    }

    calcPriority = () => {
        return this.priority * this.source!.getSpeed();
    }

    protected abstract effect(): void;

    resolve = () => {
        this.effect();
        return this;
    }
}
