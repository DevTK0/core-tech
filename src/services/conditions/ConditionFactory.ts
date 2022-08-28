import { Familiar } from "@/services/battle/Familiar";
import { Conditions } from "./Conditions";

type Conditions = typeof Conditions;
type Keys = keyof Conditions;
type Tuples<T> = T extends Keys ? [T, InstanceType<Conditions[T]>] : never;
type SingleKeys<K> = [K] extends (K extends Keys ? [K] : never) ? K : never;
type ClassType<A extends Keys> = Extract<Tuples<Keys>, [A, any]>[1];

export class ConditionFactory {
    static getCondition<K extends Keys>(
        k: SingleKeys<K>,
        source: Familiar
    ): ClassType<K> {
        return new Conditions[k](source);
    }
}
