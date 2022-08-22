import { FamiliarState } from "@/services/battle/FamiliarState";

export abstract class BaseMove {
    
    public targets: FamiliarState[] = [];

    constructor(
        public source: FamiliarState
    ) { 
        this.source = source;
    }

    setTargets = (summon: FamiliarState[]) => {
        this.targets = summon;
        return this;
    };

    protected abstract effect(): void;

    resolve = () => {
        this.effect();
        return this;
    }
}
