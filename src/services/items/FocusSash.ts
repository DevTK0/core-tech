import { Familiar } from "../battle/Familiar";
import { GlobalService } from "../battle/GlobalService";
import { BattleLogger } from "../battle/BattleLogger";

export class FocusSash {
    constructor(private source: Familiar) {
        GlobalService.subscribe("OnDamage", this.effect.bind(this));
    }

    effect() {
        if (this.source.getHealth() <= 0) {
            BattleLogger.log(
                `Focus slash activated! ${this.source.getName()}'s health can't drop below 1!`
            );
            this.source.adjustHealth(1);
        }
    }
}
