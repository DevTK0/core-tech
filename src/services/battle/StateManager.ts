import { PrismaClient, PrismaNamespace } from "@/prisma";
import { PlayerMove, FamiliarState } from "@/prisma";
import { BaseMove } from "../moves/BaseMove";
import { MoveFactory } from "../moves/MoveFactory";
import { Moves } from "../moves/Moves";
import { FamiliarFactory } from "./FamiliarFactory";

type GameState = PrismaNamespace.PromiseReturnType<
  InstanceType<typeof StateManager>["load"]
>;

export class StateManager {
  private gameState: GameState | undefined;

  constructor() {}

  getPlayerMoves() {
    this.gameState!.FamiliarState.forEach((familiar: FamiliarState) => {
      FamiliarFactory.getFamiliar(familiar);
    });

    const moves: BaseMove[] = [];

    this.gameState!.PlayerMove.forEach((data: PlayerMove) => {
      const moveName =
        data.type_name == "Art"
          ? (data.art_name as keyof typeof Moves)
          : (data.spell_name as keyof typeof Moves);

      const familiar = FamiliarFactory.findFamiliar(data.source_id);
      const move = MoveFactory.getMove(moveName, familiar);

      moves.push(move);
    });

    return moves;
  }

  async load(battleId: number, turn: number) {
    const response = await PrismaClient.turn.findUnique({
      where: {
        battle_id_turn: {
          battle_id: battleId,
          turn: turn,
        },
      },
      select: {
        battle_id: true,
        turn: true,
        FieldState: {
          select: {
            id: true,
            field: true,
          },
        },
        PlayerMove: {
          select: {
            id: true,
            turn: true,
            turn_id: true,
            type: true,
            type_name: true,
            art: true,
            art_name: true,
            spell_name: true,
            source: true,
            source_id: true,
            targets: true,
          },
        },
        FamiliarState: {
          select: {
            id: true,
            turn_id: true,
            team_id: true,
            familiar_name: true,
            stamina: true,
            attack: true,
            defense: true,
            health: true,
            speed: true,
            position: true,
            onField: true,
            turn: true,
            ItemState: {
              select: {
                item: true,
              },
            },
            ArtState: {
              select: {
                art: true,
              },
            },
          },
        },
      },
    });

    return response;
  }

  async save() {
    if (!this.gameState) {
      throw new Error("Game state is not initialized");
    }

    const response = await PrismaClient.turn.create({
      data: {
        battle: {
          connect: {
            id: this.gameState!.battle_id,
          },
        },
        turn: this.gameState!.turn + 1,
        FieldState: {
          create: [],
        },
        FamiliarState: {
          create: this.gameState!.FamiliarState.map((familiarState) => {
            return {
              team: {
                connect: {
                  id: familiarState.team_id,
                },
              },
              familiar: {
                connect: {
                  name: familiarState.familiar_name,
                },
              },
              stamina: familiarState.stamina,
              attack: familiarState.attack,
              defense: familiarState.defense,
              health: familiarState.health,
              speed: familiarState.speed,
              position: familiarState.position,
              onField: familiarState.onField,
            };
          }),
        },
      },
    });

    return response;
  }
}
