import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaNamespace, PrismaClient, PlayerMove } from "@/prisma";
import { getServerSession } from "../auth/[...nextauth]";

type ResponseType = PrismaNamespace.PromiseReturnType<typeof query>;

async function query() {
    await PrismaClient.$queryRaw`DELETE FROM Turn WHERE  id > 2`;
    await PrismaClient.$queryRaw`DELETE FROM PlayerMove WHERE  id > 2`;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const session = await getServerSession(req, res);

    if (!session) {
        console.log("no session");
        return res.status(401).json("Unauthorized");
    } else {
        const userId = session.user.id;
        await query();
        return res.status(200).json("deleted");
    }
}
