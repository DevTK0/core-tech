export class Logger {
    private combatLog: string[] = [];

    constructor() {}

    log(message: string) {
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
