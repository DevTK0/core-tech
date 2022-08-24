export class BattleQueue {


    public queue: any = [];

    constructor() { }

    nextMove() {
        return this.queue.shift();
    }

    addMove(move: any) {
        this.queue.push(move);
    }

    length() {
        return this.queue.length;
    }


}