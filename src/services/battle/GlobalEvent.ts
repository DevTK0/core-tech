import { Handlers, Callback } from "./Handlers";

enum Events {
    OnDamage,
    PreDamage,
    OnSwap,
    OnKO,
    OnHeal,
    TurnStart,
    TurnEnd,
}

export type EventName = keyof typeof Events;

export class GlobalEvent {
    private map: { [k: string]: Handlers } = {};

    constructor() {
        Object.keys(Events).forEach((key) => {
            this.map[key] = new Handlers();
        });
    }

    subscribe(type: EventName, fn: Callback) {
        this.getHandlers(type).add(fn);
    }

    dispatch(type: EventName, ...args: any[]) {
        this.getHandlers(type).dispatch(...args);
    }

    getHandlers(type: EventName) {
        return this.map[type];
    }
}
