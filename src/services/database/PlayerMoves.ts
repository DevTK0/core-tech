import { PrismaClient, PrismaNamespace } from "@/prisma";

export type PlayerMoves = PrismaNamespace.PromiseReturnType<typeof playerMoves>;

async function playerMoves(id: number) {
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
