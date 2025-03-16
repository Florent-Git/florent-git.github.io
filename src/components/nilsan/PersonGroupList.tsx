import { useContext, useEffect, useMemo } from "react";
import type { Person } from "@/model/nilsan";
import { from, groupBy, map, mergeMap, toArray } from "rxjs";
import { PersonGroup } from "./PersonGroup";
import { NilsanStoreContext } from "@/store/nilsan";
import { createAction } from "@/store/implementation/basicStore";

// bg-teal-700 text-teal-300
// bg-rose-700 text-rose-300
// bg-green-700 text-green-300
// bg-orange-700 text-orange-300
const colors = ["teal", "rose", "green", "orange"]

export function PersonGroupList() {
  const [state, dispatch] = useContext(NilsanStoreContext)!;

  const selectedList = useMemo(() => state.selectedList, [state.selectedList]);
  const nOfGroups = useMemo(() => state.nOfGroups, [state.nOfGroups]);

  useEffect(() => {
    const subscription = from(state.selectedList).pipe(
      groupBy(p => p.group),
      mergeMap(group => {
        let i = 0;
        return group.pipe(
          map(p => ({ ...p, __index: (i++) % state.nOfGroups }))
        )
      }),
      groupBy(p => p.__index),
      mergeMap(group => group.pipe(
        map(p => ({ name: p.name, group: p.group, id: p.id } as Person)),
        toArray()
      )),
      toArray()
    ).subscribe({
      next: (groupedItems) => {
        dispatch(createAction("SetGroups", { groups: groupedItems }));
      },
      complete: () => {
        console.log("All data processed");
      },
      error: (err) => {
        console.error("Error processing data: ", err);
      }
    });

    return () => subscription.unsubscribe();
  }, [selectedList, nOfGroups]);

  return (
    <div className="flex flex-wrap">
      {state.groups.map((data, i) => (
        <PersonGroup groupIndex={i + 1} key={i} people={data} twColor={colors[i % 4]} />
      ))}
    </div>
  );
}