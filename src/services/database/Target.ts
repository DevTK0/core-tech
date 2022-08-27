import { PrismaClient, PrismaNamespace } from "@/prisma";

export type Target = PrismaNamespace.PromiseReturnType<typeof Target>;

async function Target(id: number) {
  const response = await PrismaClient.target.findUnique({
    where: {
      id: id,
    },
  });

  return response;
}
