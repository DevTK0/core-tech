import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaNamespace, PrismaClient } from '@/prisma'; 

type ResponseType = PrismaNamespace.PromiseReturnType<typeof query>

async function query() {
  const response = await PrismaClient.familiar
  .findMany({
    select: {
      name: true,
      passive: true,
      attack: true,
      defense: true,
      health: true,
      speed: true,
      element: {
        select: {
          name: true
        }
      }
    }
  })
  
  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {

  return res.json(await query());
  
}
