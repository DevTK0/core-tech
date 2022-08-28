import { Familiar } from "@/services/battle/Familiar";
import { BattleLogger } from "../battle/BattleLogger";

export abstract class Item {
    protected readonly itemName: string = "";

    constructor(protected source: Familiar) {}

    protected abstract effect(): void;

    triggerEffect = () => {
        BattleLogger.useItem(this.itemName);
        this.effect();
        return this;
    };
}
