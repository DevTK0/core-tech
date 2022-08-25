import { BerryItem, FocusSash, Item } from "./BerryItem";
import { Events, FamiliarEventManager } from "./FamiliarEventManager";
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

export class MiniFamiliar {

    public event: FamiliarEventManager;

    constructor(
        public name: string,
        public health: number,
        public item: Item
    ) { 
        this.name = name;
        this.health = 50;
        this.event = new FamiliarEventManager();
        item.add(this.event);
    }

    damage(value: number) {

        this.event.dispatch("PreDamage" , this);

        this.health -= value;

        this.event.dispatch("OnDamage" , this);
        
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

        this.event.dispatch("OnHeal", this);
    }

}

const ice_golem = new MiniFamiliar("Ice Golem", 100, new BerryItem());
const fire_golem = new MiniFamiliar("Fire Golem", 100, new FocusSash());

ice_golem.damage(50);
fire_golem.damage(100);
console.log(ice_golem.getHealth());
console.log(fire_golem.getHealth());

