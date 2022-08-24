import { BaseMove } from '@/services/moves/BaseMove';
import { MoveFactory } from '@/services/moves/MoveFactory';
import { PrismaClient, PrismaNamespace, PlayerMove } from '@/prisma';
import { FamiliarState } from './FamiliarState';
import { Moves } from '../moves/Moves';
import { FamiliarFactory } from './FamiliarFactory';
import { Game } from './Game';
import { BattleQueue } from './BattleQueue';
import { loadPlayerMoves, saveGameState } from './StateManager';


export async function run() {
    
    const moves = loadPlayerMoves();
    // load moves into queue
    const queue = new BattleQueue();
    (await moves).forEach(move => {
        queue.addMove(move);
    });

    // run queue
    while (queue.length() > 0) {
        const move = queue.nextMove();
        move.resolve();
    }

    // save turn
    saveGameState();

    // generate log
    
}