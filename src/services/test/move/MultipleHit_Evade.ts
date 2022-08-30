import { BattleLogger } from "@/services/battle/BattleLogger";
import { Familiar } from "@/services/battle/Familiar";
import { MoveFactory } from "@/services/moves/MoveFactory";

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
            condition_name: "Undying",
            duration: 999,
            charges: 1,
        },
    ],
    items: [],
    arts: [],
});

const move = MoveFactory.getMove("Tri Slash", source);
move.setTargets([target]);
move.useMove();

console.log(BattleLogger.getLog());
