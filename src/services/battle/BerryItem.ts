import { EventManager, MiniFamiliar } from "./DamageEvent";

export abstract class Item {

    abstract effect(source: MiniFamiliar): void;
    abstract add(event: EventManager): void;
}

export class BerryItem extends Item {

    constructor() {
        super();
    }
    add(event: EventManager) {
        event.onDamage.add(this.effect);
    }
    effect(source: MiniFamiliar) {
        
        console.log(global.game);
        
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
    add(event: EventManager) {
        event.onDamage.add(this.effect);
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
    add(event: EventManager) {
        event.onHeal.add(this.effect);
    }
    
    effect(source: MiniFamiliar) {
        console.log(`AntiHeal activated!`);
    }
}