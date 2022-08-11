import { Prisma as PrismaNamespace, PrismaClient as Client } from "@prisma/client"

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: Client | undefined
}

if (!global.prisma) {
    global.prisma = new Client();
}
let PrismaClient: Client = global.prisma;

export {
    PrismaClient,
    PrismaNamespace
}