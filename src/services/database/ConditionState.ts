import { PrismaClient, PrismaNamespace } from "@/prisma";

export type ConditionState = Exclude<
    PrismaNamespace.PromiseReturnType<typeof ConditionState>,
    null | undefined
>;

async function ConditionState(id: number) {
    const response = await PrismaClient.conditionState.findUnique({
        where: {
            id: id,
        },
    });

    return response;
}
