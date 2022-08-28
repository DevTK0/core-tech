import { PrismaClient, PrismaNamespace } from "@/prisma";

export type FamiliarState = Exclude<
    PrismaNamespace.PromiseReturnType<typeof FamiliarState>,
    null | undefined
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
