import { PrismaClient, PrismaNamespace } from '@/prisma';
import { BaseMove } from '../moves/BaseMove';
import { MoveFactory } from '../moves/MoveFactory';
import { Moves } from '../moves/Moves';
import { FamiliarFactory } from './FamiliarFactory';
import { FamiliarState } from '@/prisma';

async function loadState(battleId: number, turn: number) {
    const response = await PrismaClient.turn.findUnique({
        where: {
            battle_id_turn: {
                battle_id: battleId,
                turn: turn
            }
        },
        select: {
            battle_id: true,
            turn: true,
            FieldState: {
                select: {
                    id: true,
                    field: true,
                }
            },
            PlayerMove: {
                select: {
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
                    turn: true,
                    ItemState: {
                        select: {
                            item: true,
                        }
                    },
                    ArtState: {
                        select: {
                            art: true
                        }
                    }
                }
            }

        }
    })
    
    return response;
}

type TurnState = PrismaNamespace.PromiseReturnType<typeof loadState>

let turnState: TurnState = {
    battle_id: 1,
    turn: 1,
    FieldState: [],
    PlayerMove: [],
    FamiliarState: []
};


export async function loadPlayerMoves() {

    turnState = await loadState(1,1);

    const familiarStates = turnState?.FamiliarState;

    familiarStates?.forEach(familiarState => {

        FamiliarFactory.getFamiliar(familiarState);
        
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

export async function saveGameState() {
    
    const response = await PrismaClient.turn.create({
        data: {
            battle: {
                connect: {
                    id: turnState!.battle_id
                }
            },
            turn: turnState!.turn + 1,
            FieldState: {
                create: [],
            },
            FamiliarState: {
                create: turnState!.FamiliarState.map(familiarState => {
                    return {
                        team: {
                            connect: {
                                id: familiarState.team_id
                            }
                        },
                        familiar: {
                            connect: {
                                name: familiarState.familiar_name
                            }
                        },
                        stamina: familiarState.stamina,
                        attack: familiarState.attack,
                        defense: familiarState.defense,
                        health: familiarState.health,
                        speed: familiarState.speed,
                        position: familiarState.position,
                        onField: familiarState.onField,
                    }
                })
            }

        }
    })
    
    return response;
}
