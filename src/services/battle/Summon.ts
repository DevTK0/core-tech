import { Familiar } from "@prisma/client";

/**
 * A Summon is an instance of a Familiar for use in battle.
 */
export class Summon {

    public health: number = 100;
    public speed: number = 100;
    public attack: number = 100;
    public defense: number = 100;

    constructor()
    constructor(
        public familiar?: Familiar,
        public position?: number
    ) { 
        this.familiar = familiar;
        this.position = position;
    }

    save() {
        
        if (this.familiar) {
            this.familiar.attack = this.attack;
            this.familiar.defense = this.defense;
            this.familiar.speed = this.speed;
            this.familiar.health = this.health;
        }

        return this.familiar;
    }

    swap(familiar: Summon) {

        [ this.position, familiar.position ] = [ familiar.position, this.position ];

        return this;
    }
    
    adjustHealth(value: number) {
        this.health += value;
        return this;
    }
    
    heal(value: number) {
        this.health += value;
        return this;
    }
    
    damage(value: number) {
        this.health -= value;
        return this;
    }
    
    adjustSpeed(value: number) {
        this.speed += value;
        return this;
    }
    
    adjustAttack(value: number) {
        this.attack += value;
        return this;
    }
    
    adjustDefense(value: number) {
        this.defense += value;
        return this;
    }
    
    
}