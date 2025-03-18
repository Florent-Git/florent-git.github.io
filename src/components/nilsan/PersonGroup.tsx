import { Person } from "@/model/nilsan";
import { createListStyle } from "../ListStyle";
import classNames from "classnames";
import { DragEventHandler, useContext } from "react";
import { NilsanStoreContext } from "@/store/nilsan";
import { createAction } from "@/store/implementation/basicStore";

export interface PersonGroupProps {
  people?: Person[],
  twColor: string,
  groupIndex: number
}

export const PersonGroup: React.FC<PersonGroupProps> = ({
  people,
  twColor,
  groupIndex
}) => {
  const [_, dispatch] = useContext(NilsanStoreContext)!;

  const listStyle = createListStyle({
    evenBgColor: `bg-${twColor}-700`,
    oddBgColor: `bg-${twColor}-700`,
    evenFgColor: `text-${twColor}-300`,
    oddFgColor: `text-${twColor}-300`,
    sameColor: true
  });

  const peopleAndGroup = [{ name: `Groupe ${groupIndex}`, group: undefined, id: undefined }, ...(people ?? [])];

  const onDrop: DragEventHandler<HTMLUListElement> = (ev) => {
    ev.preventDefault();
    const personData = ev.dataTransfer?.getData("person");
    const person = JSON.parse(personData);

    if (personData == undefined) return;

    dispatch(createAction("ChangeGroup", { person, targetGroup: groupIndex - 1 }));
  }

  const allowDrop: DragEventHandler<HTMLUListElement> = (ev) => {
    ev.preventDefault();
  }

  return (
    <ul className="m-5 min-w-3xs" onDrop={onDrop} onDragOver={allowDrop}>
      {peopleAndGroup.map((p, i) => {
        const style = listStyle(i, peopleAndGroup.length);

        const onDragStart: DragEventHandler<HTMLLIElement> = (ev) => {
          ev.dataTransfer.setData("person", JSON.stringify(p));
        }

        return (
          <li draggable={true} onDragStart={onDragStart} key={i} className={classNames(style["line"], "justify-between", "cursor-grab")}>
            <div className={classNames(style["firstElement"], (p.name.includes("Groupe") ? "font-bold text-xl text-dark-on-surface" : ""))}>{p.name}</div>
            <div className={classNames(style["lastElement"])}>{p.group ?? ""}</div>
          </li>
        )
      })}
    </ul>
  );
}