import { useContext } from "react";
import { PersonItem } from "./PersonItem";
import { NilsanStoreContext } from "@/store/nilsan";

export const PersonList = function() {
  const [state, _] = useContext(NilsanStoreContext)!;
  
  return (
    <ul className="overflow-scroll max-h-full">
      { state.participantList.map((person, i, arr) =>
        (<PersonItem key={person.id} person={person} index={i} arrayCount={arr.length}/>)
      )}
    </ul>
  );
};