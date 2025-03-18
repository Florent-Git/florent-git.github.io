import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { count, from, groupBy, mergeMap, min } from "rxjs";
import classNames from "classnames";
import { NilsanStoreContext } from "@/store/nilsan";
import { createAction } from "@/store/implementation/basicStore";

export function PersonGroupsSettings() {
  const [state, dispatch] = useContext(NilsanStoreContext)!;
  const [maxGroups, setMaxGroups] = useState(0);

  useEffect(() => {
    const subscription = from(state.selectedList).pipe(
      groupBy(p => p.group),
      mergeMap(groups => groups.pipe(count())),
      min()
    ).subscribe(max => {
      setMaxGroups(max);
      console.log(max);
    });

    return () => subscription.unsubscribe();
  }, [state.participantList]);

  function increment() {
    // if (state.nOfGroups < maxGroups)
      dispatch(createAction("IncrementGroupCount"));
  }

  function decrement() {
    if (state.nOfGroups > 1)
      dispatch(createAction("DecrementGroupCount"));
  }

  function shuffle() {
    dispatch(createAction("ShuffleSelectedPeople"));
  }

  return (
    <div className={classNames("flex", "justify-between", { "hidden": state.participantList.length <= 0 })}>
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