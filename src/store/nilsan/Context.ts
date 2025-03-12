import { createContext, type useReducer } from "react";
import { NilsanState } from "./State";
import { Action, Actions } from "./Actions";

export const NilsanStoreContext = createContext<ReturnType<typeof useReducer<NilsanState, [action: Action<keyof Actions>]>> | undefined>(undefined);



