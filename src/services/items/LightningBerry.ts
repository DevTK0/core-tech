import { Familiar } from "../battle/Familiar";
import { GlobalService } from "../battle/GlobalService";

export class LightningBerry {
    readonly itemName = "Lightning Berry";
    constructor(private source: Familiar) {
        GlobalService.subscribe("TurnStart", this.effect.bind(this));
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
