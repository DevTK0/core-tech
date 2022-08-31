import { BattleLogger } from "@/services/battle/BattleLogger";
import { Familiar } from "@/services/battle/Familiar";
import { MoveFactory } from "@/services/moves/MoveFactory";
import { GlobalService } from "../battle/GlobalService";
import { ConditionFactory } from "../conditions/ConditionFactory";

const source = new Familiar({
    id: 1,
    turn_id: 1,
    familiar_name: "Fire Golem",
    position: 1,
    health: 0,
    stamina: 0,
    attack: 100,
    defense: 100,
    speed: 125,
    onField: true,
    team_id: 1,
    familiar: {
        name: "Fire Golem",
        element_name: "Fire",
        passive: "-",
        attack: 100,
        defense: 100,
        health: 100,
        speed: 100,
    },
    team: {
        id: 1,
        name: "Team1",
        player_id: "player1",
    },
    conditions: [],
    items: [],
    arts: [],
});

const target = new Familiar({
    id: 1,
    turn_id: 1,
    familiar_name: "Ice Golem",
    position: 1,
    health: 0,
    stamina: 0,
    attack: 100,
    defense: 100,
    speed: 125,
    onField: true,
    team_id: 1,
    familiar: {
        name: "Ice Golem",
        element_name: "Ice",
        passive: "-",
        attack: 100,
        defense: 100,
        health: 100,
        speed: 100,
    },
    team: {
        id: 1,
        name: "Team2",
        player_id: "player2",
    },
    conditions: [
        {
            id: 1,
            familiarstate_id: 1,
            condition_name: "Evading",
            duration: 999,
            charges: 2,
        },
    ],
    items: [],
    arts: [],
});

describe("evade condition with", () => {
    const condition = ConditionFactory.getCondition("Evading", target, 999, 1);

    it("moves that hit multiple times", () => {
        GlobalService.queue.addMove(
            MoveFactory.getMove("Tri Slash", source).setTargets([target])
        );
        GlobalService.queue.execute();

        console.log(BattleLogger.getLog());
    });
});
