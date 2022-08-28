import { FocusSash } from "./BerryItem";
import { GlobalService } from "../battle/GlobalService";

export class MiniFamiliar {
    constructor(
        public name: string,
        public health: number,
        public speed: number,
        public team: number
    ) {
        this.name = name;
        this.health = health;
        this.speed = speed;
        this.team = team;
    }

    getTeam() {
        return this.team;
    }

    damage(value: number) {
        GlobalService.dispatch("PreDamage", this);

        this.health -= value;

        GlobalService.dispatch("OnDamage", this);

        return this;
    }

    getHealth() {
        return this.health;
    }

    setHealth(value: number) {
        this.health = value;
    }

    heal(value: number) {
        this.health += value;

        GlobalService.dispatch("OnHeal", this);
    }
}

const ice_golem = new MiniFamiliar("Ice Golem", 100, 100, 123);
const fire_golem = new MiniFamiliar("Fire Golem", 100, 100, 234);

const fs = new FocusSash(fire_golem);

GlobalService.dispatch("TurnStart");

ice_golem.damage(200);
fire_golem.damage(100);

// console.log(ice_golem);
// console.log(fire_golem);
