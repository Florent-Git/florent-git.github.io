import { Person } from "@/model/nilsan";

export interface NilsanState {
  participantList: Person[],
  selectedList: Person[],
  nOfGroups: number
}

export const nilsanInitialState: NilsanState = {
  participantList: [],
  selectedList: [],
  nOfGroups: 1
}
