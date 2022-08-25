export type Callback = (...args: any[]) => void;

export class Event {    

    private handlers: Callback[] = [];

    add(fn: Callback) {
        this.handlers.push(fn);
    }

    remove(fn: Callback) {
        this.handlers = this.handlers.filter(h => h !== fn);
    }

    dispatch(...args: any[]) {
        this.handlers.forEach(h => h(...args));
    }
    
}