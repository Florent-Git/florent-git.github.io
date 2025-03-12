import { Action, Actions } from "./Actions";
import { NilsanState } from "./State";
import { shuffle } from "lodash";

export function createReducer(actions: {[K in keyof Actions]: (state: NilsanState, action: Action<K>) => NilsanState} ) {
  return <K extends keyof Actions>(state: NilsanState, action: Action<K>) => {
    const newState = structuredClone(state);
    return actions[action.type](newState, action as any);
  }
}

export const nilsanReducer = createReducer({
  AddPersonAction: (state, { person }) => ({ ...state, participantList: [ ...state.participantList, person ] }),
  SelectPerson: (state, { person }) => {
    const foundList = state.selectedList
      .filter(p => p.id == person.id);

    if (foundList.length >= 1) return { ...state }
    return { ...state, selectedList: [ ...state.selectedList, person ] }
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
  Increment: (state, _) => ({ ...state, nOfGroups: state.nOfGroups + 1 }),
  Decrement: (state, _) => ({ ...state, nOfGroups: state.nOfGroups - 1 }), 
  ShuffleSelectedPeople: (state, _) => ({ ...state, selectedList: shuffle(state.selectedList) })
});