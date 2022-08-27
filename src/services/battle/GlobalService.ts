import { Item } from "../temp_stage/BerryItem";
import { GlobalEvent, EventName } from "./GlobalEvent";
import { Familiar } from "../battle/Familiar";
import { Callback } from "./Handlers";

/**
 * A service for managing globals including:
 * - Global Events
 * - All Familiars
 *
 * Data is encapsulated in their respective data classes to prevent direct access.
 *
 */
export class Globals {
    private globalEvent = new GlobalEvent();

    constructor(
        private familiars: Familiar[] = [],
        private items: Item[] = []
    ) {}

    addFamiliar(familiar: Familiar) {
        this.familiars.push(familiar);
    }

    getAllAllies(source: Familiar) {
        const team = source.getTeam();
        return this.familiars.filter((f) => f.getTeam() === team);
    }

    getAllEnemies(source: Familiar) {
        const team = source.getTeam();
        return this.familiars.filter((f) => f.getTeam() !== team);
    }

    getAllActiveAllies(source: Familiar) {
        const team = source.getTeam();
        return this.familiars.filter(
            (f) => f.getTeam() === team && f.isActive()
        );
    }

    getAllActiveEnemies(source: Familiar) {
        const team = source.getTeam();
        return this.familiars.filter(
            (f) => f.getTeam() !== team && f.isActive()
        );
    }

    getAllFamiliars() {
        return this.familiars;
    }

    subscribe(event: EventName, fn: Callback) {
        this.globalEvent.subscribe(event, fn);
    }

    dispatch(event: EventName, ...args: any[]) {
        this.globalEvent.dispatch(event, ...args);
    }
}

export const GlobalService: Globals = new Globals();