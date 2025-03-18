import { from, groupBy, lastValueFrom, map, mergeMap, toArray } from "rxjs";
import { shuffle } from "lodash";
import { Action, createReducer } from "./implementation/basicStore";
import { Person } from "@/model/nilsan";
import { createContext, useReducer } from "react";

export interface NilsanState {
  participantList: Person[],
  selectedList: Person[],
  nOfGroups: number,
  groups: Person[][]
}

export const initialState: NilsanState = {
  groups: [],
  nOfGroups: 1,
  participantList: [],
  selectedList: []
}

export type NilsanActions = {
  AddPersonAction: { person: Person }
  SelectPerson: { person: Person }
  UnselectPerson: { person: Person }
  RemovePerson: { person: Person }
  LoadData: { persons: Person[] }
  IncrementGroupCount: {}
  DecrementGroupCount: {}
  ShuffleSelectedPeople: {}
  SetGroups: { groups: Person[][] }
  ChangeGroup: { person: Person, targetGroup: number }
}

export const NilsanStoreContext = createContext<ReturnType<typeof useReducer<NilsanState, [action: Action<NilsanActions, keyof NilsanActions>]>> | undefined>(undefined);

export const nilsanReducer = createReducer<NilsanState, NilsanActions>({
  AddPersonAction: (state, { person }) => ({ ...state, participantList: [...state.participantList, person] }),
  SelectPerson: (state, { person }) => {
    const foundList = state.selectedList
      .filter(p => p.id == person.id);

    if (foundList.length >= 1) return { ...state }
    return { ...state, selectedList: [...state.selectedList, person] }
  },
  UnselectPerson: (state, { person }) => {
    const newSelectedList = state.selectedList
      .filter(p => p.id != person.id);

    return { ...state, selectedList: newSelectedList };
  },
  RemovePerson: (state, { person }) => {
    const newParticipantList = state.participantList
      .filter(p => p.id != person.id);

    return { ...state, participantList: newParticipantList };
  },
  LoadData: (state, { persons }) => {
    state.participantList = persons;
    return { ...state }
  },
  IncrementGroupCount: (state, _) => ({ ...state, nOfGroups: state.nOfGroups + 1 }),
  DecrementGroupCount: (state, _) => ({ ...state, nOfGroups: state.nOfGroups - 1 }),
  ShuffleSelectedPeople: (state, _) => ({ ...state, selectedList: shuffle(state.selectedList) }),
  SetGroups: (state, { groups }) => ({ ...state, groups }),
  ChangeGroup: (state, { person, targetGroup }) => {
    const newGroups = state.groups.map(group => group.filter(p => p.id != person.id));
    if (newGroups[targetGroup] == undefined) newGroups[targetGroup] = [];
    newGroups[targetGroup] = [...newGroups[targetGroup], person];
    return { ...state, groups: newGroups }
  }
});