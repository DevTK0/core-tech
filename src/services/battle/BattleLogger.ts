export class Logger {
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

export const BattleLogger: Logger = new Logger();
