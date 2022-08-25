import { MiniFamiliar } from "./DamageEvent";
import { FamiliarEventManager, Events } from './FamiliarEventManager'

export abstract class Item {

    abstract effect(source: MiniFamiliar): void;
    abstract add(event: FamiliarEventManager): void;
}

export class BerryItem extends Item {

    constructor() {
        super();
    }
    add(event: FamiliarEventManager) {
        event.subscribe("OnDamage", this.effect);
    }
    effect(source: MiniFamiliar) {

        if (source.getHealth() < 50) {
            console.log("Berry Item activated!");
            source.heal(25);
        }
    }
}

export class FocusSash extends Item {
    
    constructor() {
        super();
    }
    add(event: FamiliarEventManager) {
        event.subscribe("OnDamage", this.effect);
    }
    
    effect(source: MiniFamiliar) {
        if (source.getHealth() < 0) {
            console.log(`Focus slash activated! ${source.name}'s health can't drop below 1!`);
            source.setHealth(1);
        }
    }
}

export class AntiHeal extends Item {
    
    constructor() {
        super();
    }
    add(event: FamiliarEventManager) {
        event.subscribe("OnHeal", this.effect);
    }
    
    effect(source: MiniFamiliar) {
        console.log(`AntiHeal activated!`);
    }
}