import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaNamespace, PrismaClient } from '@/prisma'; 
import { getServerSession } from '../auth/[...nextauth]';
import { ajv, JSONSchemaType, ErrorObject } from '@/ajv';

interface RequestType {
  teamName: string
}

const schema: JSONSchemaType<RequestType> = {
  type: "object",
  properties: {
    teamName: {type: "string", default: "team1"}
  },
  required: [],
  additionalProperties: false
}


type ResponseType = PrismaNamespace.PromiseReturnType<typeof query>

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
  res: NextApiResponse<ResponseType | ErrorObject[]>
) {

  const session = await getServerSession(req, res);

  if (!session) {
    console.log('no session');
    return res.status(401);
  } else {

    const validate = ajv.compile(schema);

    if (!validate(req.query)) {
      const errors: ErrorObject[] = (validate.errors) ? validate.errors : [];
      return res.status(400).json(errors);
    }

    const userId = session.user.id;
    const teamName = req.body.teamName;

    return res.json(await query(userId, teamName));
  }
  
}
