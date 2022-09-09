import { PrismaClient, PrismaNamespace } from "@/prisma";

export type Turn = PrismaNamespace.PromiseReturnType<typeof getTurn>;

export async function getTurn(battleId: number, turn: number) {
    const response = await PrismaClient.turn.findUnique({
        where: {
            battle_id_turn: {
                battle_id: battleId,
                turn: turn,
            },
        },
        include: {
            field: true,
            familiars: {
                include: {
                    familiar: true,
                    conditions: true,
                    team: true,
                    items: true,
                    arts: true,
                },
            },
            PlayerMove: {
                include: {
                    type: true,
                    source: true,
                    targets: true,
                },
            },
        },
    });

    return response;
}

export async function saveTurn(turn: Turn) {
    if (!turn) throw new Error("Turn data is not initialized");

    const response = await PrismaClient.turn.create({
        data: {
            battle: {
                connect: {
                    id: turn.battle_id,
                },
            },
            turn: turn.turn + 1,
            field: {
                create: turn.field.map((field) => {
                    return {
                        field: field.field_name,
                    };
                }),
            },
            familiars: {
                create: turn.familiars.map((familiar) => {
                    return {
                        team: {
                            connect: {
                                id: familiar.team_id,
                            },
                        },
                        familiar: {
                            connect: {
                                name: familiar.familiar_name,
                            },
                        },
                        conditions: {
                            create: familiar.conditions.map((condition) => {
                                return {
                                    condition: {
                                        connect: {
                                            name: condition.condition_name,
                                        },
                                    },
                                    duration: condition.duration,
                                    charges: condition.charges,
                                };
                            }),
                        },
                        items: {
                            create: familiar.items.map((item) => {
                                return {
                                    item: {
                                        connect: {
                                            name: item.item_name,
                                        },
                                    },
                                };
                            }),
                        },
                        arts: {
                            create: familiar.arts.map((art) => {
                                return {
                                    art: {
                                        connect: {
                                            name: art.art_name,
                                        },
                                    },
                                };
                            }),
                        },
                        stamina: familiar.stamina,
                        attack: familiar.attack,
                        defense: familiar.defense,
                        health: familiar.health,
                        speed: familiar.speed,
                        position: familiar.position,
                        onField: familiar.onField,
                    };
                }),
            },
        },
        include: {
            field: true,
            familiars: {
                include: {
                    familiar: true,
                    conditions: true,
                    team: true,
                    items: true,
                    arts: true,
                },
            },
        },
    });

    return response;
}
