import { BattleQueue } from './BattleQueue';
import { DataService } from './DataService';
import { GlobalService } from './events/GlobalService';

export async function run() {
    
    DataService.load(1,1);

    // load moves into queue
    const moves = DataService.getPlayerMoves();
    const queue = new BattleQueue();
    moves.forEach(move => {
        queue.addMove(move);
    });

    GlobalService.dispatch("TurnStart");

    // run queue
    while (queue.length() > 0) {
        const move = queue.nextMove();
        move.resolve();
    }

    GlobalService.dispatch("TurnEnd");

    DataService.save();

    // generate log
    
}