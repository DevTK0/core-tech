import { BaseMove } from '@/services/moves/BaseMove';
import { MoveFactory } from '@/services/moves/MoveFactory';
import { PrismaClient, PrismaNamespace, PlayerMove } from '@/prisma';
import { FamiliarState } from './FamiliarState';
import { Moves } from '../moves/Moves';
import { FamiliarFactory } from './FamiliarFactory';
import { Game } from './Game';
import { BattleQueue } from './BattleQueue';
import { StateManager } from './StateManager';


export async function run() {
    
    const state = new StateManager();
    state.load(1,1);

    // load moves into queue
    const moves = state.getPlayerMoves();
    const queue = new BattleQueue();
    moves!.forEach(move => {
        queue.addMove(move);
    });

    // run queue
    while (queue.length() > 0) {
        const move = queue.nextMove();
        move.resolve();
    }

    // save turn
    state.save();

    // generate log
    
}