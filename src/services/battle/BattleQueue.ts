import { BaseMove } from "../moves/BaseMove";

/**
 * This isn't really a queue, more like a list.
 * nextMove() retrieves the fastest move in the list by searching each one everytime.
 * This is required as items/abilities/moves can affect the move order at any time.
 * 
 */
export class BattleQueue {

    public moves: BaseMove[] = [];

    constructor() { }

    nextMove() {

        let fastest: BaseMove = this.moves[0];

        this.moves.forEach((move: BaseMove) => {
            if (move.calcPriority() > fastest.calcPriority()) {
                fastest = move;
            }
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