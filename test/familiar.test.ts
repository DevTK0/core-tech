import { Condition } from "@/services/conditions/Condition";
import { Familiar } from "@/services/battle/Familiar";
import { ConditionFactory } from "@/services/conditions/ConditionFactory";

const STARTING_HEALTH = 100;

const status1 = {
    id: 1,
    turn_id: 1,
    familiar_name: "Fire Golem",
    position: 1,
    health: STARTING_HEALTH,
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
};

describe("damage familiar", () => {
    test("regular damage", () => {
        const fam1 = new Familiar(JSON.parse(JSON.stringify(status1)));
        fam1.damage(10);

        expect(fam1.getHealth()).toBe(STARTING_HEALTH - 10);
    });

    test("KO familiar", () => {
        const fam1 = new Familiar(JSON.parse(JSON.stringify(status1)));
        fam1.damage(100);

        expect(fam1.getHealth()).toBe(0);
        expect(fam1.isKOed()).toBe(true);
    });

    test("damage invulnerable familiar", () => {
        const fam1 = new Familiar(JSON.parse(JSON.stringify(status1)));
        const invul = ConditionFactory.getCondition(
            "Invulnerable",
            fam1,
            "Turns",
            1
        );

        fam1.addCondition(invul);
        fam1.damage(10);

        expect(fam1.getHealth()).toBe(STARTING_HEALTH);
    });

    test("damage undying familiar", () => {
        const fam1 = new Familiar(JSON.parse(JSON.stringify(status1)));
        const undying = ConditionFactory.getCondition(
            "Undying",
            fam1,
            "Turns",
            1
        );
        fam1.addCondition(undying);

        fam1.damage(100);

        expect(fam1.getHealth()).toBe(1);
    });

    test("damage evading familiar", () => {
        const fam1 = new Familiar(JSON.parse(JSON.stringify(status1)));
        const evading = ConditionFactory.getCondition(
            "Evading",
            fam1,
            "Charges",
            3
        );

        fam1.addCondition(evading);
        fam1.damage(100);

        expect(fam1.getHealth()).toBe(STARTING_HEALTH);

        fam1.damage(100);
        expect(fam1.getHealth()).toBe(STARTING_HEALTH);

        fam1.damage(100);
        expect(fam1.getHealth()).toBe(STARTING_HEALTH);

        fam1.damage(100);
        expect(fam1.getHealth()).toBe(0);
    });
});
