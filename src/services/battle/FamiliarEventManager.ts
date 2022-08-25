import { Event, Callback } from './Event';

export enum Events {
    OnDamage,
    PreDamage,  
    OnSwap,
    OnDeath,
    OnHeal      
}

type EventName = keyof typeof Events;

export class FamiliarEventManager {

    private map : {[k: string]: Event} = {};

    constructor() { 
        Object.keys(Events).forEach(key => {
            this.map[key] = new Event();
        });
    }

    subscribe(type: EventName, fn : Callback) {
        this.getHandlers(type).add(fn);
    }

    dispatch(type: EventName, ...args: any[]) {
        this.getHandlers(type).dispatch(...args);
    }

    getHandlers(type: EventName) {
        return this.map[type];
    }
}