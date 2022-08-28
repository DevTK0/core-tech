import { PrismaClient, PrismaNamespace } from "@/prisma";

export type Target = Exclude<
    PrismaNamespace.PromiseReturnType<typeof Target>,
    null | undefined
>;

async function Target(id: number) {
    const response = await PrismaClient.target.findUnique({
        where: {
            id: id,
        },
    });

    return response;
}
