import { useEffect } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaNamespace, PrismaClient } from "@/prisma";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

type QueryType = PrismaNamespace.PromiseReturnType<typeof query>;

async function query() {
  const response = await PrismaClient.familiar.findMany({
    select: {
      name: true,
      passive: true,
      attack: true,
      defense: true,
      health: true,
      speed: true,
      element: {
        select: {
          name: true,
        },
      },
    },
  });

  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    console.log(session);
  } else {
    console.log("no session");
  }

  res.status(200).json(session);
}
