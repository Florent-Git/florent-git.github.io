import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { NilsanStoreContext } from "@/store/nilsan/Context";
import { createAction } from "@/store/nilsan/Actions";
import { count, from, groupBy, mergeMap, min } from "rxjs";

export function PersonGroupsSettings() {
  const [state, dispatch] = useContext(NilsanStoreContext)!;
  const [maxGroups, setMaxGroups] = useState(0);

  useEffect(() => {
    const subscription = from(state.participantList).pipe(
      groupBy(p => p.group),
      mergeMap(groups => groups.pipe(count())),
      min()
    ).subscribe(setMaxGroups);

    return () => subscription.unsubscribe();
  }, [state.participantList]);

  function increment() {
    if (state.nOfGroups < maxGroups)
      dispatch(createAction("Increment", {}));
  }

  function decrement() {
    if (state.nOfGroups > 1)
      dispatch(createAction("Decrement", {}));
  }

  function shuffle() {
    dispatch(createAction("ShuffleSelectedPeople", {}));
  }

  return (
    <div className="flex justify-between">
      <div>
        <span className="px-3 py-2">Nombre de groupes:</span>
        <button onClick={decrement} className="hover:bg-dark-secondary hover:text-dark-on-secondary cursor-pointer px-3 py-2 bg-dark-secondary-container text-dark-on-secondary-container rounded-xl"><FontAwesomeIcon icon={faMinus} /></button>
        <span className="px-3 py-2">{state.nOfGroups}</span>
        <button onClick={increment} className="hover:bg-dark-secondary hover:text-dark-on-secondary cursor-pointer px-3 py-2 bg-dark-secondary-container text-dark-on-secondary-container rounded-xl"><FontAwesomeIcon icon={faPlus} /></button>
      </div>
      <button onClick={shuffle} className="hover:bg-dark-secondary hover:text-dark-on-secondary cursor-pointer px-3 py-2 bg-dark-secondary-container text-dark-on-secondary-container rounded-xl"><FontAwesomeIcon className="mx-2" icon={faShuffle} /> Mélanger </button>
    </div>
  );
}