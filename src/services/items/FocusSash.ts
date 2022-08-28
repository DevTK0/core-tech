import { Familiar } from "../battle/Familiar";
import { GlobalService } from "../battle/GlobalService";
import { BattleLogger } from "../battle/BattleLogger";

export class FocusSash {
    readonly itemName = "Focus Sash";

    constructor(private source: Familiar) {
        GlobalService.subscribe("OnDamage", this.effect.bind(this));
    }

    effect() {
        if (this.source.getHealth() <= 0) {
            BattleLogger.logEffect(
                this.itemName,
                `${this.source.getName()}'s health can't drop below 1!`
            );
            this.source.adjustHealth(1);
        }
    }
}
