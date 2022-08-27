import { Familiar } from "@/services/battle/Familiar";
import { FamiliarState } from "@/prisma";
import { GlobalService } from "./GlobalService";

export class FamiliarFactory {
    private familiars = new Map();

    loadFamiliar(state: FamiliarState) {
        if (this.familiars.has(state.id)) return this.familiars.get(state.id);
        else {
            const fs = new Familiar(state);
            this.familiars.set(state.id, fs);
            GlobalService.addFamiliar(fs);
            return fs;
        }
    }

    findFamiliar(id: number) {
        return this.familiars.get(id);
    }
}

export const FamiliarService = new FamiliarFactory();
