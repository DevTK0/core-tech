import { BaseMove } from '@/services/moves/BaseMove';
import { MoveFactory } from '@/services/moves/MoveFactory';
import { PrismaClient, PrismaNamespace, PlayerMove } from '@/prisma';
import { FamiliarState } from './FamiliarState';
import { Moves } from '../moves/Moves';
import { FamiliarFactory } from './FamiliarFactory';
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
                    skill: true,
                    source: true,
                    targets: true,
                }
            },
            FamiliarState: {
                select: {
                    id: true,
                    turn_id: true,
                    familiar_id: true,
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
                    SkillState: {
                        select: {
                            id: true,
                            skill: true
                        }
                    }
                }
            }

        }
    })
    
    return response;
}

export type TurnState = PrismaNamespace.PromiseReturnType<typeof query>;
  
async function loadState() {

    const turnState = await query(1,1);

    const familiarStates = turnState?.FamiliarState;

    familiarStates?.forEach(familiarState => {
        // load familiars
        // TODO: remove this load and only load the required familiars
        const familiar = FamiliarFactory.getFamiliar(familiarState);

        const skillStates = familiarState.SkillState;

        // load moves
        // TODO: remove this load and only load the required moves
        skillStates.forEach(skillState => {
            const moveName = skillState.skill.name as keyof typeof Moves;
            const moveClass = MoveFactory.getMove(moveName, familiar);
        });

        // load items
        // TODO: remove this load and only load the required items
        // const itemState = familiarState.ItemState;
        // const item = itemState.item;
    });
}


function processMoves(turnState: TurnState) {

    const moveList : any[] = []

    const playerMoves = turnState?.PlayerMove || [];

    playerMoves.forEach(playerMove => {
        const moveName = playerMove.skill?.name as keyof typeof Moves;
        const source = FamiliarFactory.getFamiliar(playerMove.source);
        const moveClass = MoveFactory.getMove(moveName, source);
    });

    return moveList;
}



function saveState() {

}

const fam = {
    id: 1,
    turn_id: 1,
    fieldstate_id: 1,
    familiar_id: 1,
    position: 1,
    stamina: 1,
    health: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    onField: false
}

const familiar1 = new FamiliarState(fam);
const familiar2 = new FamiliarState(fam);

const move1: BaseMove = MoveFactory.getMove("Fire Blast", familiar1);
const move2: BaseMove = MoveFactory.getMove("Ice Blast", familiar2);

move1
.setTargets([familiar2])
.resolve()
;

move2
.setTargets([familiar1])
.resolve()
;




/*


- generate move list

- sort based on speed

- resolve moves



- save state
-- prisma transactional createMany
*/