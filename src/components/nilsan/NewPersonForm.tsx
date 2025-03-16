import { NilsanGroup } from "@/model/nilsan";
import { createAction } from "@/store/implementation/basicStore";
import { NilsanStoreContext } from "@/store/nilsan";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export function NewPersonForm() {
  const [state, dispatch] = useContext(NilsanStoreContext)!;

  function onFormSubmit(items: FormData) {
    if (!items.has("name") || !items.has("group")) return;

    const name: string = items.get("name")!.toString();
    // @ts-ignore
    const group = NilsanGroup[items.get("group")!.toString()];

    dispatch(createAction("AddPersonAction", {
      person: { id: self.crypto.randomUUID() , group, name }
    }));
  }

  return (
    <form className="flex m-5 w-1/3" action={onFormSubmit}>
      <input className="grow-10 focus:outline-0 rounded-l-xl px-3 py-2 bg-dark-inverse-surface text-dark-on-inverse-surface" type="text" name="name" id="name" />
      <select className="grow-1 px-3 py-2 bg-dark-primary-container text-dark-on-primary-container cursor-pointer hover:bg-dark-secondary hover:text-dark-on-secondary" name="group" id="group">
        { Object.entries(NilsanGroup)
          .map(([key, value]) => (<option key={key} value={key}>{value}</option>))}
      </select>
      <button className="grow-1 py-2 cursor-pointer px-3 bg-dark-secondary-container text-dark-on-secondary-container hover:bg-dark-secondary hover:text-dark-on-secondary rounded-r-xl" type="submit" >
        <FontAwesomeIcon className="px-2" icon={faPlus} />
        Ajouter
      </button>
    </form>
  );
}