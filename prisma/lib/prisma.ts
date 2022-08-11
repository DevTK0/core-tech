import { Prisma as PrismaNamespace, PrismaClient as Client } from "@prisma/client"

const PrismaClient: Client = new Client();

export {
    PrismaClient,
    PrismaNamespace
}