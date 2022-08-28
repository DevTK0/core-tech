import { Familiar } from "@/services/battle/Familiar";
import { MoveMap } from "./MoveMap";

type Moves = typeof MoveMap;
type Keys = keyof Moves;
type Tuples<T> = T extends Keys ? [T, InstanceType<Moves[T]>] : never;
type SingleKeys<K> = [K] extends (K extends Keys ? [K] : never) ? K : never;
type ClassType<A extends Keys> = Extract<Tuples<Keys>, [A, any]>[1];

export class MoveFactory {
    static getMove<K extends Keys>(
        k: SingleKeys<K>,
        source: Familiar
    ): ClassType<K> {
        return new MoveMap[k](source);
    }
}
