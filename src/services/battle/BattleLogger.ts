import { Condition, CounterType } from "../conditions/Condition";

export class BattleLogger {
    private combatLog: string[] = [];

    constructor() {}

    useMove(user: string, move: string) {
        this.combatLog.push(`${user} used ${move}!`);
    }

    KO(familiar: string) {
        this.combatLog.push(`${familiar} was Knocked Out!`);
    }

    useItem(trigger: string) {
        this.combatLog.push(`${trigger} was activated!`);
    }

    addBuff() {
        this.combatLog.push("Buff");
    }

    addPositiveCondition(
        familiar: string,
        condition: Condition,
        counter: number,
        type: CounterType
    ) {
        this.combatLog.push(
            `${familiar} is ${condition.getName()} (${counter} ${type})!`
        );
    }

    // Negative Conditions should be past tense.
    addNegativeCondition(familiar: string, condition: Condition) {
        this.combatLog.push(`${familiar} was ${condition.getName()}!`);
    }

    logCondition(effect: string) {
        this.combatLog.push(`${effect}`);
    }

    add(message: string) {
        this.combatLog.push(message);
    }

    getLog(): string[] {
        return this.combatLog;
    }

    clear() {
        this.combatLog = [];
    }
}
