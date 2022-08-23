import { FamiliarState } from "@/services/battle/FamiliarState";
import { Moves } from "./Moves";

type Moves = typeof Moves;
type Keys = keyof Moves;
type Tuples<T> = T extends Keys ? [T, InstanceType<Moves[T]>] : never;
type SingleKeys<K> = [K] extends (K extends Keys ? [K] : never) ? K : never;
type ClassType<A extends Keys> = Extract<Tuples<Keys>, [A, any]>[1];

export class MoveFactory {
    static getMove<K extends Keys>(k: SingleKeys<K>, source: FamiliarState): ClassType<K> {
        return new Moves[k](source);
    }
}

