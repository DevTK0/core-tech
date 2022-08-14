import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaNamespace, PrismaClient } from '@/prisma'; 
import { getServerSession } from '../auth/[...nextauth]';
import { ajv, JSONSchemaType, ErrorObject } from '@/ajv';


interface RequestType {
  familiarsetId: number
  slot: number
  moveId: number
}

const schema: JSONSchemaType<RequestType> = {
  type: "object",
  properties: {
    familiarsetId: {type: "integer", nullable: false},
    slot: {type: "integer", nullable: false, minimum: 1, maximum: 4},
    moveId: {type: "integer", nullable: false},
  },
  required: ["familiarsetId", "slot", "moveId"],
  additionalProperties: false
}


type ResponseType = PrismaNamespace.PromiseReturnType<typeof query>

async function query(familiarsetId: number, slot: number, moveId: number) {
  const response = await PrismaClient.moveSet.upsert({
    where: {
      familiarset_id_slot: {
        familiarset_id: familiarsetId,
        slot: slot
      }
    },
    update: {
      move_id: moveId
    },
    create: {
      familiarset_id: familiarsetId,
      slot: slot,
      move_id: moveId
    },
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
    return res.status(401).json([]);
  } else {

    const validate = ajv.compile(schema);

    if (!validate(req.body)) {
      const errors: ErrorObject[] = (validate.errors) ? validate.errors : [];
      return res.status(400).json(errors);
    }

    const familiarsetId = req.body.familiarsetId;
    const slot = req.body.slot;
    const moveId = req.body.moveId;

    return res.json(await query(familiarsetId, slot, moveId));
  }
  
}
