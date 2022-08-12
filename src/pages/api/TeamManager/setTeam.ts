import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaNamespace, PrismaClient } from '@/prisma'; 
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]';

type QueryType = PrismaNamespace.PromiseReturnType<typeof query>

async function query(playerId: string, teamName: string) {
  const response = await PrismaClient.team.create({
    data: {
      name: teamName,
      player_id: playerId
    }
  });
  
  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QueryType>
) {

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    console.log('no session');
  } else {
    const userId = session.user.id;
    const teamName = (typeof req.query.teamName === 'string') ? req.query.teamName : 'team1';
    return res.json(await query(userId, teamName));
  }
  
}
