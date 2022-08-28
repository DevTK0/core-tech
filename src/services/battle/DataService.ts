import { BaseMove } from "../moves/BaseMove";
import { MoveFactory } from "../moves/MoveFactory";
import { Moves } from "../moves/Moves";
import { FamiliarService } from "./FamiliarService";
import { Familiar } from "./Familiar";
import { ItemFactory } from "../items/ItemFactory";
import { Items } from "../items/Items";
import { Conditions } from "../conditions/Conditions";
import { ConditionFactory } from "../conditions/ConditionFactory";

import { PlayerMoves } from "../database/PlayerMoves";
import { FamiliarState } from "../database/FamiliarState";
import { ItemState } from "../database/ItemState";
import { Target } from "../database/Target";
import { Turn, getTurn, saveTurn } from "../database/Turn";

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
                        const itemName = item.item_name as keyof typeof Items;
                        ItemFactory.getItem(itemName, familiar);
                    }
                });

                data.conditions.forEach((condition: any) => {
                    if (condition) {
                        // Load into condition service
                        const conditionName =
                            condition.condition_name as keyof typeof Conditions;
                        ConditionFactory.getCondition(conditionName, familiar);
                    }
                });
            }
        });

        const moves: BaseMove[] = [];

        // load player moves for this turn
        this.turnData.PlayerMove.forEach((data: PlayerMoves) => {
            if (data) {
                const moveName =
                    data.type_name == "Art"
                        ? (data.art_name as keyof typeof Moves)
                        : (data.spell_name as keyof typeof Moves);

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

    async load(battleId: number, turn: number) {
        this.turnData = await getTurn(battleId, turn);
    }

    async save() {
        if (!this.turnData) throw new Error("Turn data is not initialized");

        return await saveTurn(this.turnData);
    }
}

export const DataService: DataManager = new DataManager();
