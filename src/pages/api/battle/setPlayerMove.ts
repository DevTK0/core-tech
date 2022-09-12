import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaNamespace, PrismaClient, PlayerMove } from "@/prisma";
import { getServerSession } from "../auth/[...nextauth]";
import { ajv, JSONSchemaType, ErrorObject } from "@/ajv";

interface RequestType {
    turn: number;
    battleId: number;
    playerMove: PlayerMove[];
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
                },
                required: [
                    "turn_id",
                    "player_id",
                    "type_name",
                    "move_name",
                    "source_id",
                ],
            },
        },
    },
    required: ["turn", "battleId", "playerMove"],
};

type ResponseType = PrismaNamespace.PromiseReturnType<typeof query>;

async function get(turn: number, battleId: number, playerId: string) {
    const response = await PrismaClient.turn.findMany({
        where: {
            battle_id: battleId,
            turn: turn,
            PlayerMove: {
                some: {
                    player_id: playerId,
                },
            },
        },
        include: {
            PlayerMove: true,
        },
    });

    return response;
}

async function query(
    turn: number,
    battleId: number,
    playerMoves: PlayerMove[]
) {
    const response = await PrismaClient.turn.upsert({
        where: {
            battle_id_turn: {
                battle_id: battleId,
                turn: turn,
            },
        },
        update: {
            PlayerMove: {
                create: playerMoves.map((playerMove) => {
                    return {
                        player_id: playerMove.player_id,
                        type_name: playerMove.type_name,
                        move_name: playerMove.move_name,
                        source_id: playerMove.source_id,
                    };
                }),
            },
        },
        create: {
            battle_id: battleId,
            turn: turn,
            PlayerMove: {
                create: playerMoves.map((playerMove) => {
                    return {
                        player_id: playerMove.player_id,
                        type_name: playerMove.type_name,
                        move_name: playerMove.move_name,
                        source_id: playerMove.source_id,
                    };
                }),
            },
        },
        include: {
            PlayerMove: true,
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
        const previous = await get(turn, battleId, userId);

        // check if player has committed previous moves
        if (previous.length > 0) {
            console.log("Player has already committed moves");
            return res
                .status(400)
                .json({ message: "Player has already committed moves" });
        }

        // save new state to database
        return res.json(await query(turn, battleId, playerMove));
    }
}
