import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaNamespace, PrismaClient } from '@/prisma'; 
import { getServerSession } from '../auth/[...nextauth]';
import { ajv, JSONSchemaType, ErrorObject } from '@/ajv';

interface RequestType {
  teamId: number,
  familiarId: number,
  position: number
}

const schema: JSONSchemaType<RequestType> = {
  type: "object",
  properties: {
    teamId: {type: "integer", nullable: false},
    familiarId: {type: "integer", nullable: false},
    position: {type: "integer", nullable: false},
  },
  required: ["teamId", "familiarId", "position"],
  additionalProperties: false
}

type ResponseType = PrismaNamespace.PromiseReturnType<typeof query>

async function query(teamId: number, familiarId: number, position: number) {
  const response = await PrismaClient.familiarSet.upsert({
    where: {
      team_id_position: {
        team_id: teamId,
        position: position
      }
    },
    update: {
      familiar_id: familiarId
    },
    create: {
      team_id: teamId,
      familiar_id: familiarId,
      position: position
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
  } else {

    const validate = ajv.compile(schema);

    if (!validate(req.body)) {
      const errors: ErrorObject[] = (validate.errors) ? validate.errors : [];
      return res.status(400).json(errors);
    }
    
    const teamId = req.body.teamId;
    const familiarId = req.body.familiarId;
    const position = req.body.position;
    
    return res.status(200).json(await query(teamId, familiarId, position));
  }
  
}
