import { FamiliarState as PrismaFamiliarState, Item } from "@prisma/client";

/**
 * Holds the current state of the familiar and provides methods for interacting with the familiar.
 */
export class FamiliarState {

    constructor(
        private familiar: PrismaFamiliarState,
    ) { 
        this.familiar = familiar;
    }

    swap(familiar2: FamiliarState) {

        [ this.familiar.position, familiar2.familiar.position ] = [ familiar2.familiar.position, this.familiar.position ];

        return this;
    }

    getTeam() {
        return this.familiar.team_id;
    }

    isActive() {
        return this.familiar.onField;
    }
    
    adjustHealth(value: number) {
        this.familiar.health += value;
        return this;
    }

    getHealth() {
        return this.familiar.health
    }
    
    heal(value: number) {
        this.familiar.health += value;
        return this;
    }
    
    damage(value: number) {
        this.familiar.health -= value;
        return this;
    }

    adjustStamina(value: number) {
        this.familiar.stamina += value;
        return this;
    }
    
    adjustSpeed(value: number) {
        this.familiar.speed += value;
        return this;
    }

    getSpeed() {
        return this.familiar.speed;
    }
    
    adjustAttack(value: number) {
        this.familiar.attack += value;
        return this;
    }

    getAttack() {
        return this.familiar.attack;
    }
    
    adjustDefense(value: number) {
        this.familiar.defense += value;
        return this;
    }

    getDefense() {
        return this.familiar.defense;
    }
    
    
}