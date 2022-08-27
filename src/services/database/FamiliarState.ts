import { PrismaClient, PrismaNamespace } from "@/prisma";

export type FamiliarState = PrismaNamespace.PromiseReturnType<
    typeof FamiliarState
>;

async function FamiliarState(id: number) {
    const response = await PrismaClient.familiarState.findUnique({
        where: {
            id: id,
        },
        include: {
            familiar: true,
            conditions: true,
            team: true,
            items: true,
            arts: true,
        },
    });

    return response;
}
