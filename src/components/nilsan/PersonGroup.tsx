import { Person } from "@/model/nilsan";
import { createListStyle } from "../ListStyle";
import classNames from "classnames";

export interface PersonGroupProps {
  people: Person[],
  twColor: string,
  groupIndex: number
}

export const PersonGroup: React.FC<PersonGroupProps> = ({
  people,
  twColor,
  groupIndex
}) => {
  const listStyle = createListStyle({
    evenBgColor: `bg-${twColor}-700`,
    oddBgColor: `bg-${twColor}-700`,
    evenFgColor: `text-${twColor}-300`,
    oddFgColor: `text-${twColor}-300`,
    sameColor: true
  });

  const peopleAndGroup = [ {name: `Groupe ${groupIndex}`, group: undefined, id: undefined}, ...people ];

  return (
    <ul className="m-5 min-w-3xs">
      {peopleAndGroup.map((p, i) => {
        const style = listStyle(i, peopleAndGroup.length);
        return (
          <li key={i} className={classNames(style["line"], "justify-between")}>
            <div className={classNames(style["firstElement"], (p.name.includes("Groupe") ? "font-bold text-xl text-dark-on-surface" : ""))}>{ p.name }</div>
            <div className={classNames(style["lastElement"])}>{ p.group ?? "" }</div>
          </li>
        )
      })}
    </ul>
  );
}