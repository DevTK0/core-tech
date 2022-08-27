import { PrismaClient, PrismaNamespace } from "@/prisma";

export type ItemState = PrismaNamespace.PromiseReturnType<typeof ItemState>;

async function ItemState(id: number) {
  const response = await PrismaClient.itemState.findUnique({
    where: {
      id: id,
    },
  });

  return response;
}
