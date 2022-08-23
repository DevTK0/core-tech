import { FamiliarState } from "@/services/battle/FamiliarState";
import { FamiliarState as FamiliarStateType } from "@/prisma";

export namespace FamiliarFactory {
  const familiars = new Map();

  export function getFamiliar(state: FamiliarStateType) {
    if (familiars.has(state.id)) return familiars.get(state.id);
    else {
      const fs = new FamiliarState(state);
      familiars.set(state.id, fs);
      return fs;
    }
  }

  export function findFamiliar(id: number) {
    return familiars.get(id);
  }
}
