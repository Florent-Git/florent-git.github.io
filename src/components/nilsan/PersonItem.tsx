import { Person } from "@/model/nilsan";
import { ChangeEvent, DragEventHandler, useContext } from "react";
import { createListStyle } from "../ListStyle";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NilsanStoreContext } from "@/store/nilsan";
import { createAction } from "@/store/implementation/basicStore";

export type PersonItemProps = {
  person: Person,
  index: number,
  arrayCount: number
};

const listStyle = createListStyle({
  evenBgColor: "bg-dark-primary",
  evenFgColor: "text-dark-on-primary",
  oddBgColor: "bg-dark-tertiary",
  oddFgColor: "text-dark-on-tertiary"
});

export const PersonItem: React.FC<PersonItemProps> = ({
  person,
  index,
  arrayCount
}) => {
  const [state, dispatch] = useContext(NilsanStoreContext)!;

  const personId = person.id;

  const isChecked = state.groups
    .flatMap(p => p)
    .filter(p => p.id == person.id).length >= 1;

  function onCheck(ev: ChangeEvent) {
    // @ts-ignore
    if (!ev.target.checked) {
      dispatch(createAction("UnselectPerson", { person })) // FIX: Dé-sélectionner une personne en dé-sélectionne une autre
    } else {
      dispatch(createAction("SelectPerson", { person }))
    }
  }

  function onRemove() {
    dispatch(createAction("UnselectPerson", { person }));
    dispatch(createAction("RemovePerson", { person }));
  }

  const style = listStyle(index, arrayCount);

  const onDragStart: DragEventHandler<HTMLLIElement> = (ev) => {
    ev.dataTransfer.setData("person", JSON.stringify(person));
  }

  return (
    <li className={classNames(style["line"])} draggable={true} onDragStart={onDragStart}>
      <div className={classNames(style["firstElement"])}>
        <input id={personId} type="checkbox" checked={isChecked} onChange={onCheck} />
      </div>
      <label htmlFor={personId} className={classNames(style["centerElement"], "grow-1")}>{person.name}</label>
      <div className={classNames(style["centerElement"])}>{person.group}</div>
      <button className={classNames(style["lastElement"], "bg-dark-error-container", "text-dark-on-error-container", "hover:bg-dark-error", "hover:text-dark-on-error", "cursor-pointer")} onClick={onRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  )
}
