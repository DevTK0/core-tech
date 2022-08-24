import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaNamespace, PrismaClient } from '@/prisma'; 
import { run } from '@/services/battle/BattleService';

// type ResponseType = PrismaNamespace.PromiseReturnType<typeof query>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  return res.json(await run());
  
}
