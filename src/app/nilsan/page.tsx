"use client";

import { NewPersonForm } from "@/components/nilsan/NewPersonForm";
import { nilsanInitialState } from "@/store/nilsan/State";
import { NilsanStoreContext } from "@/store/nilsan/Context";
import { useReducer } from "react";
import { nilsanReducer } from "@/store/nilsan/Reducer";
import { PersonList } from "@/components/nilsan/PersonList";
import { ImportExportData } from "@/components/nilsan/ImportExportData";
import { PersonGroupsSettings } from "@/components/nilsan/PersonGroupsSettings";
import { PersonGroupList } from "@/components/nilsan/PersonGroupList";

export default function Nilsan() {
  const [state, dispatch] = useReducer(nilsanReducer, nilsanInitialState);

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
            <PersonGroupsSettings />
            <PersonGroupList />
          </div>
        </div>
      </div>
    </NilsanStoreContext.Provider>
  )
}
