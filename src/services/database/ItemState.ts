import { PrismaClient, PrismaNamespace } from "@/prisma";

export type ItemState = Exclude<
    PrismaNamespace.PromiseReturnType<typeof ItemState>,
    null | undefined
>;

async function ItemState(id: number) {
    const response = await PrismaClient.itemState.findUnique({
        where: {
            id: id,
        },
    });

    return response;
}
