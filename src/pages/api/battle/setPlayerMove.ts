import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaNamespace, PrismaClient, PlayerMove } from "@/prisma";
import { getServerSession } from "../auth/[...nextauth]";
import { ajv, JSONSchemaType, ErrorObject } from "@/ajv";
import { run } from "@/services/battle/BattleService";
import { Target } from "@prisma/client";

type PlayerMoves = PlayerMove & { targets: Target[] };

interface RequestType {
    turn: number;
    battleId: number;
    playerMove: PlayerMoves[];
}

const schema: JSONSchemaType<RequestType> = {
    type: "object",
    properties: {
        turn: { type: "integer" },
        battleId: { type: "integer" },
        playerMove: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    player_id: { type: "string" },
                    turn_id: { type: "integer" },
                    type_name: { type: "string" },
                    move_name: { type: "string" },
                    source_id: { type: "integer" },
                    targets: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "integer" },
                                playermove_id: { type: "integer" },
                                target_id: { type: "integer" },
                            },
                            required: ["target_id"],
                        },
                    },
                },
                required: [
                    "turn_id",
                    "player_id",
                    "type_name",
                    "move_name",
                    "source_id",
                    "targets",
                ],
            },
        },
    },
    required: ["turn", "battleId", "playerMove"],
};

type ResponseType = PrismaNamespace.PromiseReturnType<typeof query>;

async function get(turn: number, battleId: number) {
    const response = await PrismaClient.battle.findFirst({
        where: {
            id: battleId,
            Turn: {
                some: {
                    turn: turn,
                },
            },
        },
        include: {
            Turn: {
                include: {
                    PlayerMove: true,
                },
            },
        },
    });

    return response;
}

async function query(
    turn: number,
    battleId: number,
    playerId: string,
    playerMoves: PlayerMoves[],
    player_1_done: boolean,
    player_2_done: boolean
) {
    const response = await PrismaClient.turn.upsert({
        where: {
            battle_id_turn: {
                battle_id: battleId,
                turn: turn,
            },
        },
        update: {
            player_1_done: player_1_done,
            player_2_done: player_2_done,
            PlayerMove: {
                create: playerMoves.map((playerMove) => {
                    return {
                        player_id: playerId,
                        type_name: playerMove.type_name,
                        move_name: playerMove.move_name,
                        source_id: playerMove.source_id,
                        targets: {
                            create: playerMove.targets.map((target) => {
                                return {
                                    target_id: target.target_id,
                                };
                            }),
                        },
                    };
                }),
            },
        },
        // redundant, for dev purposes
        create: {
            battle_id: battleId,
            turn: turn,
            PlayerMove: {
                create: playerMoves.map((playerMove) => {
                    return {
                        player_id: playerId,
                        type_name: playerMove.type_name,
                        move_name: playerMove.move_name,
                        source_id: playerMove.source_id,
                        targets: {
                            create: playerMove.targets.map((target) => {
                                return {
                                    target_id: target.target_id,
                                };
                            }),
                        },
                    };
                }),
            },
        },
        include: {
            PlayerMove: {
                include: {
                    targets: true,
                },
            },
        },
    });

    return response;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const session = await getServerSession(req, res);

    if (!session) {
        console.log("no session");
        return res.status(401).json("Unauthorized");
    } else {
        const validate = ajv.compile(schema);

        if (!validate(req.body)) {
            const errors: ErrorObject[] = validate.errors
                ? validate.errors
                : [];
            return res.status(400).json(errors);
        }

        const userId = session.user.id;
        const battleId = req.body.battleId;
        const turn = req.body.turn;
        const playerMove = req.body.playerMove;

        // get state from database
        const battle = await get(turn, battleId);

        if (!battle || battle.Turn.length === 0) {
            return res.status(404).json("Battle or Turn Not Found");
        }

        const playerNum = battle?.player_1_id === userId ? 1 : 2;
        const player_1_done =
            playerNum == 1 ? true : battle?.Turn[0].player_1_done;
        const player_2_done =
            playerNum == 2 ? true : battle?.Turn[0].player_2_done;

        // check if player has committed previous moves
        const previous = battle?.Turn[0].PlayerMove.find(
            (playerMove) => playerMove.player_id === userId
        );

        if (previous) {
            console.log("Player has already committed moves");
            return res
                .status(400)
                .json({ message: "Player has already committed moves" });
        }

        // save new state to database
        const response = res.json(
            await query(
                turn,
                battleId,
                userId,
                playerMove,
                player_1_done,
                player_2_done
            )
        );

        // check if all players have committed moves
        // if (player_1_done && player_2_done) {
        //     const battleres = await run();
        //     console.log(battleres);
        // }

        return response;
    }
}
