import { BattleLogger } from "./BattleLogger";
import { battleQueue, BattleQueue } from "./BattleQueue";
import { DataService } from "./DataService";
import { GlobalService } from "./GlobalService";

export async function run() {
    await DataService.load(1, 1);

    // load moves into queue
    const moves = DataService.getPlayerMoves();
    // const queue = new BattleQueue();
    moves.forEach((move) => {
        battleQueue.addMove(move);
    });

    GlobalService.dispatch("TurnStart");

    // run queue
    battleQueue.execute();

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
