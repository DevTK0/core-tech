import { Move } from "../moves/Move";
import { MoveFactory } from "../moves/MoveFactory";
import { MoveMap } from "../moves/MoveMap";
import { FamiliarService } from "./FamiliarService";
import { Familiar } from "./Familiar";
import { ItemFactory } from "../items/ItemFactory";
import { ItemMap } from "../items/ItemMap";
import { ConditionMap } from "../conditions/ConditionMap";
import { ConditionFactory } from "../conditions/ConditionFactory";

import { PlayerMove } from "../database/PlayerMove";
import { FamiliarState } from "../database/FamiliarState";
import { ItemState } from "../database/ItemState";
import { Target } from "../database/Target";
import { Turn, getTurn, saveTurn } from "../database/Turn";
import { ConditionState } from "../database/ConditionState";
import { CounterType } from "../conditions/Condition";

export class DataManager {
    private turnData: Turn | undefined;

    constructor() {}

    getPlayerMoves() {
        if (!this.turnData) {
            throw new Error("Game state is not initialized");
        }

        // load familiars first
        this.turnData.familiars.forEach((data: FamiliarState) => {
            if (data) {
                const familiar = FamiliarService.loadFamiliar(data);

                // load items together
                data.items.forEach((item: ItemState) => {
                    if (item) {
                        // Load into item service
                        const itemName = item.item_name as keyof typeof ItemMap;
                        ItemFactory.getItem(itemName, familiar);
                    }
                });

                data.conditions.forEach((condition: ConditionState) => {
                    if (condition) {
                        // Load into condition service
                        const conditionName =
                            condition.condition_name as keyof typeof ConditionMap;
                        ConditionFactory.getCondition(
                            conditionName,
                            familiar,
                            condition.type as CounterType,
                            condition.count
                        );
                    }
                });
            }
        });

        const moves: Move[] = [];

        // load player moves for this turn
        this.turnData.PlayerMove.forEach((data: PlayerMove) => {
            if (data) {
                const moveName = data.move_name as keyof typeof MoveMap;

                const familiar = FamiliarService.findFamiliar(data.source_id);
                const move = MoveFactory.getMove(moveName, familiar);

                const targets: Familiar[] = [];
                data.targets.forEach((target: Target) => {
                    targets.push(
                        FamiliarService.findFamiliar(target!.target_id)
                    );
                });
                move.setTargets(targets);

                moves.push(move);
            }
        });

        return moves;
    }

    getTurnState() {
        return this.turnData;
    }

    async load(battleId: number, turn: number) {
        this.turnData = await getTurn(battleId, turn);
    }

    async save() {
        if (!this.turnData) throw new Error("Turn data is not initialized");

        return await saveTurn(this.turnData);
    }
}

export const DataService: DataManager = new DataManager();
