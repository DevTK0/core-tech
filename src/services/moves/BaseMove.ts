import { Summon } from "@/services/battle/Summon";

export class BaseMove {
    
    public source: Summon = new Summon();
    public targets: Summon[] = [];

    constructor() { }

    setSource = (summon: Summon) => {
        this.source = summon;
        return this;
    };

    setTargets = (summon: Summon[]) => {
        this.targets = summon;
        return this;
    };

    effect = () => {}

    resolve = () => {
        
        this.effect();

        return this;
    }
}
