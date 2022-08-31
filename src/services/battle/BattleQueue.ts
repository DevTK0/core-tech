import { Move } from "../moves/Move";

/**
 * This isn't really a queue, more like a list.
 * nextMove() retrieves the fastest move in the list by searching each one everytime.
 * This is required as items/abilities/moves can affect the move order at any time.
 *
 */
export class BattleQueue {
    protected setup: Move[] = [];
    protected battle: Move[] = [];
    public record: Move[] = [];

    constructor() {}

    getFastest(queue: Move[]) {
        let fastest: Move = queue[0];

        queue.forEach((move: Move) => {
            if (move.getPriority() > fastest.getPriority()) {
                fastest = move;
            }
            if (move.getPriority() == fastest.getPriority()) {
                // do nothing - TBD
            }
        });

        return fastest;
    }

    removeMove(queue: Move[], fastest: Move) {
        return queue.filter((move: Move) => {
            return move.moveName !== fastest.moveName;
        });
    }

    addMove(move: any) {
        this.setup.push(move);
        this.battle.push(move);
    }

    // Used by moves to insert new moves during setup phase.
    // Don't use for initial move loading.
    insertMove(move: any) {
        this.battle.push(move);
    }

    removeSelf(move: any) {
        this.battle = this.battle.filter((m: any) => {
            return m.moveName !== move.moveName;
        });
    }

    setupPhase() {
        while (this.setup.length > 0) {
            const move = this.getFastest(this.setup);
            this.setup = this.removeMove(this.setup, move);
            move.setupMove();
        }
    }

    battlePhase() {
        while (this.battle.length > 0) {
            const move = this.getFastest(this.battle);
            this.battle = this.removeMove(this.battle, move);
            move.useMove();
            this.record.push(move);
        }
    }

    finalPhase() {
        for (const move of this.record) {
            move.postMove(this.record);
        }
    }

    execute() {
        this.setupPhase();
        this.battlePhase();
        this.finalPhase();
    }

    length() {
        return this.battle.length;
    }
}
