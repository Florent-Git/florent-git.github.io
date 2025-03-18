import { faSave, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useContext } from "react";
import { toBase64 } from "js-base64";
import { NilsanStoreContext } from "@/store/nilsan";
import { createAction } from "@/store/implementation/basicStore";

export function ImportExportData() {
  const [state, dispatch] = useContext(NilsanStoreContext)!;

  function onImportData(ev: ChangeEvent) {
    const importedFile = (ev.target as HTMLInputElement).files?.[0];

    if (importedFile == null) console.error("Cannot open file from input");
    
    importedFile?.text()
      .then(JSON.parse)
      .then(json => dispatch(createAction("LoadData", { persons: json })));
  }

  function onExportData() {
    const exportFileBtn: HTMLAnchorElement = document.querySelector("#exportFile")!;
    exportFileBtn.href = "data:text/plain;base64," + toBase64(JSON.stringify(state.participantList));
    exportFileBtn.click();
  }

  return (
    <div className="flex m-5">
      <label htmlFor="importFile" className="cursor-pointer px-3 py-2 bg-dark-secondary-container text-dark-on-secondary-container hover:bg-dark-secondary hover:text-dark-on-secondary rounded-l-xl"><FontAwesomeIcon className="mx-2" icon={faDownload}/> Importer</label>
      <input id="importFile" type="file" className="hidden" onChange={onImportData} />
      <button className="cursor-pointer px-3 py-2 bg-dark-tertiary-container text-dark-on-tertiary-container hover:bg-dark-tertiary hover:text-dark-on-tertiary rounded-r-xl" type="button" onClick={onExportData}><FontAwesomeIcon className="mx-2" icon={faSave}/> Exporter</button>
      <a id="exportFile" className="hidden" download="nilsan.json"></a>
    </div>
  )
}
