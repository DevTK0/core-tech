import { BaseMove } from "../moves/BaseMove";

/**
 * This isn't really a queue, more like a list.
 * nextMove() retrieves the fastest move in the list by searching each one everytime.
 * This is required as items/abilities/moves can affect the move order at any time.
 *
 */
export class BattleQueue {
    protected moves: BaseMove[] = [];

    constructor() {}

    nextMove() {
        if (this.moves.length == 0) {
            throw new Error("No moves in queue");
        }

        let fastest: BaseMove = this.moves[0];

        this.moves.forEach((move: BaseMove) => {
            // Fastest Moves have priority
            if (move.getPriority() > fastest.getPriority()) {
                fastest = move;
            }
            if (move.getPriority() == fastest.getPriority()) {
                // do nothing - TBD
            }
        });

        this.moves = this.moves.filter((move: BaseMove) => {
            return move.moveName !== fastest.moveName;
        });

        return fastest;
    }

    addMove(move: any) {
        this.moves.push(move);
    }

    length() {
        return this.moves.length;
    }
}
