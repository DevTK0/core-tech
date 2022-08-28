import { Familiar } from "@/services/battle/Familiar";
import { ItemMap } from "./ItemMap";

type Items = typeof ItemMap;
type Keys = keyof Items;
type Tuples<T> = T extends Keys ? [T, InstanceType<Items[T]>] : never;
type SingleKeys<K> = [K] extends (K extends Keys ? [K] : never) ? K : never;
type ClassType<A extends Keys> = Extract<Tuples<Keys>, [A, any]>[1];

export class ItemFactory {
    static getItem<K extends Keys>(
        k: SingleKeys<K>,
        source: Familiar
    ): ClassType<K> {
        return new ItemMap[k](source);
    }
}
