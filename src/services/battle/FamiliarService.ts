import { FamiliarState } from "@/services/battle/FamiliarState";
import { FamiliarState as FamiliarStateType } from "@/prisma";
import { GlobalService } from "./events/GlobalService";

export class FamiliarFactory {
  
  private familiars = new Map();

  loadFamiliar(state: FamiliarStateType) {
    if (this.familiars.has(state.id)) return this.familiars.get(state.id);
    else {
      const fs = new FamiliarState(state);
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