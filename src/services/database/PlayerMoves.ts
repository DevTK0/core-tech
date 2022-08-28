import { PrismaClient, PrismaNamespace } from "@/prisma";

export type PlayerMoves = Exclude<
    PrismaNamespace.PromiseReturnType<typeof PlayerMoves>,
    null | undefined
>;

async function PlayerMoves(id: number) {
    const response = await PrismaClient.playerMove.findUnique({
        where: {
            id: id,
        },
        include: {
            type: true,
            source: true,
            targets: true,
        },
    });

    return response;
}
