import { BerryItem, FocusSash, Item } from "./BerryItem";
import { FamiliarState } from "./FamiliarState";

type CallbackFunctionVariadic = (...args: any[]) => void;

export class Event {    

    private handlers: CallbackFunctionVariadic[] = [];

    add(fn: CallbackFunctionVariadic) {
        this.handlers.push(fn);
    }

    remove(fn: (...args: unknown[]) => unknown) {
        this.handlers = this.handlers.filter(h => h !== fn);
    }

    dispatch(o: any) {
        this.handlers.forEach(h => h(o));
    }
    
}

export class EventManager {

    constructor(
        public preDamage: Event = new Event(),
        public onDamage: Event = new Event(),
        public onSwap: Event = new Event(),
        public onDeath: Event = new Event(),
        public onHeal: Event = new Event()
    ) { }
}

export class MiniFamiliar {

    public eventManager: EventManager;

    constructor(
        public name: string,
        public health: number,
        public item: Item
    ) { 
        this.name = name;
        this.health = 50;
        this.eventManager = new EventManager();
        item.add(this.eventManager);
    }

    damage(value: number) {

        this.eventManager.preDamage.dispatch(this);

        this.health -= value;

        this.eventManager.onDamage.dispatch(this);
        
        return this;
    }

    getHealth() {
        return this.health;
    }

    setHealth(value: number) {
        this.health = value;
    }

    heal(value: number) {
        this.health += value;

        this.eventManager.onHeal.dispatch(this);
    }

}

const ice_golem = new MiniFamiliar("Ice Golem", 100, new BerryItem());
const fire_golem = new MiniFamiliar("Fire Golem", 100, new FocusSash());

ice_golem.damage(50);
fire_golem.damage(100);
console.log(ice_golem.getHealth());
console.log(fire_golem.getHealth());

