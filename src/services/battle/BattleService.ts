import { BaseMove } from '@/services/moves/BaseMove';
import { MoveFactory } from '@/services/moves/MoveFactory';
import { PrismaClient, PrismaNamespace, PlayerMove } from '@/prisma';
import { FamiliarState } from './FamiliarState';
import { Moves } from '../moves/Moves';
import { FamiliarFactory } from './FamiliarFactory';
import { Game } from './Game';
// import { FamiliarState } from './FamiliarState';

async function query(battleId: number, turn: number) {
    const response = await PrismaClient.turn.findUnique({
        where: {
            battle_id_turn: {
                battle_id: battleId,
                turn: turn
            }
        },
        select: {
            FieldState: {
                select: {
                    id: true,
                }
            },
            PlayerMove: {
                select: {
                    id: true,
                    turn: true,
                    type: true,
                    art: true,
                    source: true,
                    targets: true
                }
            },
            FamiliarState: {
                select: {
                    id: true,
                    turn_id: true,
                    team_id: true,
                    familiar_name: true,
                    stamina: true,
                    attack: true,
                    defense: true,
                    health: true,
                    speed: true,
                    position: true,
                    onField: true,
                    ItemState: {
                        select: {
                            id: true,
                            item: true,
                        }
                    },
                    ArtState: {
                        select: {
                            id: true,
                            art: true
                        }
                    }
                }
            }

        }
    })
    
    return response;
}

export type TurnState = PrismaNamespace.PromiseReturnType<typeof query>;
  
export async function loadFamiliarState() {

    const turnState = await query(1,1);
    const familiars: FamiliarState[] = [];

    const familiarStates = turnState?.FamiliarState;

    familiarStates?.forEach(familiarState => {

        const familiar = FamiliarFactory.getFamiliar(familiarState);
        familiars.push(familiar);
        
    });

    global.game = new Game(familiars);

    return familiars;
}

export async function loadPlayerMoves() {

    const turnState = await query(1,1);

    const familiarStates = turnState?.FamiliarState;

    familiarStates?.forEach(familiarState => {

        const familiar = FamiliarFactory.getFamiliar(familiarState);
        
    });

    const playerMoves = turnState?.PlayerMove;
    const moves: BaseMove[] = [];

    playerMoves?.forEach(playerMove => {
        const moveName = playerMove.art?.name as keyof typeof Moves;
        const source = FamiliarFactory.getFamiliar(playerMove.source);
        const move = MoveFactory.getMove(moveName, source);

        const targets = playerMove.targets?.map(target => {
            return FamiliarFactory.findFamiliar(target.target_id);
        }).filter(target => target !== undefined);

        move.setTargets(targets);
        
        moves.push(move);
    }
    );

    return moves;
}


// function processMoves(turnState: TurnState) {

//     const moveList : any[] = []

//     const playerMoves = turnState?.PlayerMove || [];

//     playerMoves.forEach(playerMove => {
//         const moveName = playerMove.skill?.name as keyof typeof Moves;
//         const source = FamiliarFactory.getFamiliar(playerMove.source);
//         const moveClass = MoveFactory.getMove(moveName, source);
//     });

//     return moveList;
// }



// function saveState() {

// }

// const fam = {
//     id: 1,
//     turn_id: 1,
//     fieldstate_id: 1,
//     familiar_id: 1,
//     position: 1,
//     stamina: 1,
//     health: 1,
//     attack: 1,
//     defense: 1,
//     speed: 1,
//     onField: false
// }

// const familiar1 = new FamiliarState(fam);
// const familiar2 = new FamiliarState(fam);

// const move1: BaseMove = MoveFactory.getMove("Fire Blast", familiar1);
// const move2: BaseMove = MoveFactory.getMove("Ice Blast", familiar2);

// move1
// .setTargets([familiar2])
// .resolve()
// ;

// move2
// .setTargets([familiar1])
// .resolve()
// ;




/*


- generate move list

- sort based on speed

- resolve moves



- save state
-- prisma transactional createMany
*/