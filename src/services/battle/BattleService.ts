import { BattleLogger } from "./BattleLogger";
import { DataService } from "./DataService";
import { GlobalService } from "./GlobalService";

export async function run() {
    await DataService.load(1, 1);

    // load moves into queue
    const moves = DataService.getPlayerMoves();
    moves.forEach((move) => {
        GlobalService.queue.addMove(move);
    });

    GlobalService.dispatch("TurnStart");
    GlobalService.queue.execute();
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
