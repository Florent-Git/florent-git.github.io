"use client";

import { NewPersonForm } from "@/components/nilsan/NewPersonForm";
import { useReducer } from "react";
import { initialState, nilsanReducer, NilsanStoreContext } from "@/store/nilsan";
import { PersonList } from "@/components/nilsan/PersonList";
import { ImportExportData } from "@/components/nilsan/ImportExportData";
import { PersonGroupsSettings } from "@/components/nilsan/PersonGroupsSettings";
import { PersonGroupList } from "@/components/nilsan/PersonGroupList";

export default function Nilsan() {
  const [state, dispatch] = useReducer(nilsanReducer, initialState);

  return (
    <NilsanStoreContext.Provider value={[state, dispatch]}>
      <div className="flex flex-col h-screen">
        <div className="flex justify-between">
          <NewPersonForm />
          <ImportExportData />
        </div>
        <div className="flex">
          <div className="flex flex-col w-1/3 m-5">
            <PersonList />
          </div>
          <div className="flex flex-col w-2/3 m-5">
            { state.participantList.length <= 0
                ? ( <div className="absolute -translate-y-1/2 -translate-x-1/2 top-1/3 left-1/2 text-5xl">Pour commencer, ajoutez des participants</div> )
                : ( <PersonGroupsSettings /> ) }
            <PersonGroupList />
          </div>
        </div>
      </div>
    </NilsanStoreContext.Provider>
  )
}
