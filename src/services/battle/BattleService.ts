import { BattleLogger } from "./BattleLogger";
import { BattleQueue } from "./BattleQueue";
import { DataService } from "./DataService";
import { GlobalService } from "./GlobalService";

export async function run() {
    await DataService.load(1, 1);

    // load moves into queue
    const moves = DataService.getPlayerMoves();
    const queue = new BattleQueue();
    moves.forEach((move) => {
        queue.addMove(move);
    });

    GlobalService.dispatch("TurnStart");

    // run queue
    while (queue.length() > 0) {
        const move = queue.nextMove();
        move.useMove();
    }

    GlobalService.dispatch("TurnEnd");

    await DataService.save();

    // generate log
    const log = BattleLogger.getLog();
    BattleLogger.clear();

    return {
        game: GlobalService.getAllFamiliars(),
        log: log,
    };
}
