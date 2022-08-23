import { FamiliarState } from "./FamiliarState";

export class Game {

    constructor(
        private familiars: FamiliarState[] = [],
    ) { }

    // Global targetting system allows you to select whichever target you want.
    // Targets are provided through their FamiliarState interface which provides
    // a layer of abstraction from the fields.

    getAllAllies(source: FamiliarState) {
        const team = source.getTeam();
        return this.familiars.filter(f => f.getTeam() === team);
    }

    getAllEnemies(source: FamiliarState) {
        const team = source.getTeam();
        return this.familiars.filter(f => f.getTeam() !== team);
    }

    getAllActiveAllies(source: FamiliarState) {
        const team = source.getTeam();
        return this.familiars.filter(f => f.getTeam() === team && f.isActive());
    }

    getAllActiveEnemies(source: FamiliarState) {
        const team = source.getTeam();
        return this.familiars.filter(f => f.getTeam() !== team && f.isActive());
    }

    getAllFamiliars() {
        return this.familiars;
    }
        
}

declare global {
    var game: Game
}
if (!global.game) {
    global.game = new Game();
}