import { BattleLogger } from "@/services/battle/BattleLogger";
import { Familiar } from "@/services/battle/Familiar";
import { GlobalService } from "@/services/battle/GlobalService";
import { Item } from "../Item";

export class LightningBerry extends Item {
    itemName = "Lightning Berry";

    constructor(protected source: Familiar) {
        super(source);
        GlobalService.event.subscribe(
            "TurnStart",
            this.triggerEffect.bind(this)
        );
    }

    effect() {
        const speed = this.source.getSpeed() + 25;
        this.source.adjustSpeed(speed);

        const enemies = GlobalService.getAllEnemies(this.source);
        enemies.forEach((enemy) => {
            const enemySpeed = enemy.getSpeed() - 25;
            enemy.adjustSpeed(enemySpeed);
        });
    }
}
