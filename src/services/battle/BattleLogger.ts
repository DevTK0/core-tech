export class Logger {
    private combatLog: string[] = [];

    constructor() {}

    logMove(user: string, move: string) {
        this.combatLog.push(`${user} used ${move}!`);
    }

    logKO(familiar: string) {
        this.combatLog.push(`${familiar} was Knocked Out!`);
    }

    logEffect(trigger: string, effect: string) {
        this.combatLog.push(`${trigger} was activated! ${effect}`);
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

export const BattleLogger: Logger = new Logger();
