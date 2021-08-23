export type Falsy = false | '' | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;
