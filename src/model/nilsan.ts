export interface Person {
  id: string,
  name: string;
  group: NilsanGroup
}

export enum NilsanGroup {
  FR = "FR",
  JP = "JP"
}