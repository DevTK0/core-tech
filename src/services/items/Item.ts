import { Familiar } from "@/services/battle/Familiar";
import { BattleLogger } from "../battle/BattleLogger";
import { GlobalService } from "../battle/GlobalService";

export abstract class Item {
    protected readonly itemName: string = "";

    constructor(protected source: Familiar) {}

    protected abstract effect(): void;

    triggerEffect = () => {
        GlobalService.logger.useItem(this.itemName);
        this.effect();
        return this;
    };
}
