export type ClassName<T> = T extends new () => infer R ? R : never;

export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 2 : 1) ? true : false;

export type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

export type Values<T> = T[keyof T];

export type TypeName<T, TypeMap> = Values<{
  [Prop in keyof TypeMap]: Equals<T, TypeMap[Prop]> extends true ? Prop : never
}>