export type ClassName<T> = T extends new () => infer R ? R : never;

export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 2 : 1) ? true : false;

export type Values<T> = T[keyof T];

export type TypeName<T, TypeMap> = Values<{
  [Prop in keyof TypeMap]: Equals<T, TypeMap[Prop]> extends true ? Prop : never
}>