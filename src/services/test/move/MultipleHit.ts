import { GlobalService } from "../battle/GlobalService";
import { MiniFamiliar } from "./DamageEvent";

export abstract class Item {
    public abstract effect(...args: any[]): void;
}

export class BerryItem extends Item {
    constructor(private source: MiniFamiliar) {
        super();
        GlobalService.subscribe("TurnEnd", this.effect.bind(this));
    }

    effect() {
        if (this.source.getHealth() < 50) {
            console.log("Berry Item activated!");
            this.source.heal(25);
        }
    }
}

export class FocusSash extends Item {
    constructor(private source: MiniFamiliar) {
        super();
        GlobalService.subscribe("PostDamage", this.effect.bind(this));
    }

    effect() {
        if (this.source.getHealth() <= 0) {
            console.log(
                `Focus slash activated! ${this.source.name}'s health can't drop below 1!`
            );
            this.source.setHealth(1);
        }
    }
}
