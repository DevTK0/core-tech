import { BaseMove } from "@/services/moves/BaseMove";
import { MoveFactory } from "@/services/moves/MoveFactory";
import { PrismaClient, PrismaNamespace } from "@/prisma";

async function query(id: number) {
  const response = await PrismaClient.familiarState.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      familiar: true,
      attack: true,
      defense: true,
      health: true,
      speed: true,
      position: true,
      onField: true,
      ItemState: {
        select: {
          id: true,
          item: true,
        },
      },
      SkillState: {
        select: {
          id: true,
          skill: true,
        },
      },
    },
  });

  return response;
}

export type FamiliarState = PrismaNamespace.PromiseReturnType<typeof query>;

/*

- load state
-- prisma battle session object
--- 12x summons with their assigned moves and items
--- player 1 and 2 moves
--- spells
-- assign models to service layer objects
--- 12x Summon
--- Game/Board/Field State


- save state
-- prisma transactional createMany

*/
