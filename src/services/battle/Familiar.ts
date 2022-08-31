import { Condition, CounterType } from "../conditions/Condition";
import { ConditionFactory } from "../conditions/ConditionFactory";
import { ConditionMap } from "../conditions/ConditionMap";
import { FamiliarState } from "../database/FamiliarState";
import { BattleLogger } from "./BattleLogger";
import { GlobalService } from "./GlobalService";

/**
 * Holds the current state of the familiar and provides methods for interacting with the familiar.
 */
export class Familiar {
    constructor(private familiar: FamiliarState) {}

    getId() {
        return this.familiar.id;
    }

    swap(familiar2: Familiar) {
        [this.familiar!.position, familiar2.familiar!.position] = [
            familiar2.familiar!.position,
            this.familiar!.position,
        ];

        GlobalService.event.dispatch("OnSwap", this);

        return this;
    }

    addPositiveCondition(
        condition: Condition,
        counter: number,
        type: CounterType
    ) {
        GlobalService.logger.addPositiveCondition(
            this.getName(),
            condition,
            counter,
            type
        );
        if (type === "Charges") {
            condition.setCharges(counter);
        }
        if (type === "Turns") {
            condition.setDuration(counter);
        }
        this.addCondition(condition);
    }

    addNegativeCondition(condition: Condition) {
        GlobalService.logger.addNegativeCondition(this.getName(), condition);
        this.addCondition(condition);
    }

    private addCondition(condition: Condition) {
        // New ConditionStates will be added so the missing fields are unnecessary.
        // @ts-ignore
        this.familiar.conditions.push({
            condition_name: condition.getName(),
            duration: condition.getDuration(),
            charges: condition.getCharges(),
        });
    }

    removeCondition(condition: Condition) {
        this.familiar.conditions = this.familiar.conditions.filter(
            (c) => c.condition_name !== condition.getName()
        );
    }

    updateCondition(condition: Condition) {
        const found = this.familiar.conditions.find(
            (c) => c.condition_name === condition.getName()
        );
        if (found) {
            found.duration = condition.getDuration();
            found.charges = condition.getCharges();
        }
    }

    getConditions() {
        return this.familiar.conditions;
    }

    getName() {
        return this.familiar.familiar_name;
    }

    getTeam() {
        return this.familiar.team_id;
    }

    isActive() {
        return this.familiar.onField;
    }

    adjustHealth(value: number) {
        this.familiar.health = value;
        return this;
    }

    getHealth() {
        return this.familiar.health;
    }

    heal(value: number) {
        this.familiar.health += value;
    }

    isInvulnerable() {
        return this.familiar.conditions.find(
            (c) => c.condition_name === "Invulnerable"
        );
    }

    isEvading() {
        return (
            this.familiar.conditions.find(
                (c) => c.condition_name === "Evading"
            ) !== undefined
        );
    }

    damage(value: number) {
        if (!this.isInvulnerable()) {
            this.familiar.health =
                this.familiar.health > value ? this.familiar.health - value : 0;
        } else {
            GlobalService.event.dispatch("Invulnerable", this);
        }

        GlobalService.event.dispatch("OnDamage", this);

        if (this.familiar.health === 0) {
            const KO = ConditionFactory.getCondition(
                "Knocked Out",
                this,
                999,
                999
            );
            this.addNegativeCondition(KO);
            GlobalService.event.dispatch("OnKO", this);
        }
    }

    useStamina(value: number) {
        this.familiar.stamina -= value;
    }

    gainStamina(value: number) {
        this.familiar.stamina += value;
    }

    adjustSpeed(value: number) {
        this.familiar.speed = value;
    }

    adjustAttack(value: number) {
        this.familiar.attack = value;
    }

    adjustDefense(value: number) {
        this.familiar.defense = value;
    }

    getSpeed() {
        return this.familiar.speed;
    }

    getAttack() {
        return this.familiar.attack;
    }

    getDefense() {
        return this.familiar.defense;
    }
}
