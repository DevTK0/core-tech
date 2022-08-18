import { BaseMove } from '@/services/moves/BaseMove';
import { MoveFactory } from '@/services/moves/MoveFactory';
import { Summon } from '@/services/battle/Summon';

const move1: BaseMove = MoveFactory.getMove("Fire Blast");
const move2: BaseMove = MoveFactory.getMove("Ice Blast");


const familiar1 = new Summon();
const familiar2 = new Summon();

move1
.setSource(familiar1)
.setTargets([familiar2])
.resolve()
;

move2
.setSource(familiar2)
.setTargets([familiar1])
.resolve()
;