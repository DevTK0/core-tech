import { useEffect } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { Session } from "@/types/next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Session>
) {

  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    console.log(session);
  } else {
    console.log("no session");
  }

  res.status(200).json(session);
}
