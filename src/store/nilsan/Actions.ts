import { Person } from "@/model/nilsan";
import { ClassName } from "@/utils/typeUtils";

export interface NilsanAction<T> {
  type: ClassName<T>
}

export type Actions = {
  AddPersonAction: { person: Person }
  SelectPerson: { person: Person }
  UnselectPerson: { person: Person }
  RemovePerson: { person: Person }
  LoadData: { persons: Person[] }
  Increment: {}
  Decrement: {}
  ShuffleSelectedPeople: {}
}

export type Action<K extends keyof Actions> = Actions[K] & { type: keyof Actions };

export function createAction<K extends keyof Actions>(
  actionName: K,
  args: Actions[K]
): Action<K> {
  return ({ ...args, type: actionName });
}