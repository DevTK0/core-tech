import { MiniFamiliar } from "./DamageEvent";
import { Item } from "./BerryItem";
import { GlobalEvent, EventName } from "./GlobalEvent";
import { FamiliarState } from "../FamiliarState";
import { Callback } from "./Handlers";
import { FamiliarService } from "../FamiliarService";

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
        private familiars: MiniFamiliar[] = [],
        private items: Item[] = [],
    ) { }


    addMiniFamiliar(familiar: MiniFamiliar) {
        this.familiars.push(familiar);
    }

    addFamiliar(familiar: FamiliarState) {
        // this.familiars.push(familiar);
    }

    getAllAllies(source: MiniFamiliar) {
        const team = source.getTeam();
        return this.familiars.filter(f => f.getTeam() === team);
    }

    getAllEnemies(source: MiniFamiliar) {
        const team = source.getTeam();
        return this.familiars.filter(f => f.getTeam() !== team);
    }

    // getAllActiveAllies(source: MiniFamiliar) {
    //     const team = source.getTeam();
    //     return this.familiars.filter(f => f.getTeam() === team && f.isActive());
    // }

    // getAllActiveEnemies(source: MiniFamiliar) {
    //     const team = source.getTeam();
    //     return this.familiars.filter(f => f.getTeam() !== team && f.isActive());
    // }

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