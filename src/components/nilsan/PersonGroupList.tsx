import { useContext, useEffect } from "react";
import { makeGroups, type Person } from "@/model/nilsan";
import { from, groupBy, map, mergeMap, toArray } from "rxjs";
import { PersonGroup } from "./PersonGroup";
import { NilsanStoreContext } from "@/store/nilsan";
import { createAction } from "@/store/implementation/basicStore";
import { range } from "lodash";
import classNames from "classnames";

// bg-teal-700 text-teal-300
// bg-rose-700 text-rose-300
// bg-green-700 text-green-300
// bg-orange-700 text-orange-300
const colors = ["teal", "rose", "green", "orange"];

export function PersonGroupList() {
  const [state, dispatch] = useContext(NilsanStoreContext)!;

  useEffect(() => {
    makeGroups(state.selectedList, state.nOfGroups)
      .then(groupedItems => dispatch(createAction("SetGroups", { groups: groupedItems })))
      .catch(err => console.error("Error processing data: ", err));
  }, [state.selectedList, state.nOfGroups]);

  return (
    <div className={classNames("flex flex-wrap", { "hidden": state.participantList.length <= 0 })}>
      {range(state.nOfGroups).map(i => {
        return (<PersonGroup groupIndex={i + 1} key={i} people={state.groups[i]} twColor={colors[i % colors.length]} />)
      })}
    </div>
  );
}