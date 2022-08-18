import { FireBlast } from "./FireBlast";
import { IceBlast } from "./IceBlast";

const Moves = {
    "Fire Blast": FireBlast,
    "Ice Blast": IceBlast
};

type Moves = typeof Moves;
type Keys = keyof Moves;
type Tuples<T> = T extends Keys ? [T, InstanceType<Moves[T]>] : never;
type SingleKeys<K> = [K] extends (K extends Keys ? [K] : never) ? K : never;
type ClassType<A extends Keys> = Extract<Tuples<Keys>, [A, any]>[1];

export class MoveFactory {
    static getMove<K extends Keys>(k: SingleKeys<K>): ClassType<K> {
        return new Moves[k]();
    }
}
