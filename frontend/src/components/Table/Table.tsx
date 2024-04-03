import axios from "axios";
import { capitalize } from "../../utils";
import { useState } from "react";
import { Fornitori, Acquisti, Clienti, Vendite } from "../../interfaceHelper";
import { TableProps } from "../../interfaceHelper";
import { useEffect } from "react";

export default function Table({
  fields,
  informations,
  setInformations,
}: TableProps) {
  const [flag, setFlag] = useState(false);
  const deleteFornitore = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:8000/radioapp/deleteFornitore/${id}`
      );
      alert("Fornitore eliminato con successo");
      setInformations(
        informations.filter((info) => info.id !== id) as
          | Fornitori[]
          | Clienti[]
          | Vendite[]
          | Acquisti[]
      );
    } catch (error) {
      console.error("Failed to delete fornitore:", error);
    }
  };

  useEffect(() => {
    setFlag(informations.some(info => 'partita_iva' in info || 'codice_fornitore' in info));
    console.log(flag)
  }, [informations]);


  return (
    <table className="shadow-sm table-fixed shadow-slate-300 border text-center border-slate-300 w-full rounded-md overflow-hidden">
      <thead className="bg-slate-100 text-black ">
        <tr>
          {fields.map((field) => (
            <th className="h-16" key={field}>
              {capitalize(field)}
            </th>
          ))}
          {flag ? <th>Interagisci</th> : null}
        </tr>
      </thead>
      <tbody className="border-spacing-y-1 border xl:text-xs">
        {informations.map((information, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-spacing-y-1 h-12 gap-2 border p-2"
          >
            {information &&
              Object.entries(information).map(([key, info]) => (
                <td key={key} className="mx-2">
                  {info instanceof Date ? info.toLocaleString() : info}
                </td>
              ))}
            {flag ? (
              <td
                className="flex flex-row gap-1 justify-center items-center pt-4 mx-2"
                key={""}
              >
                <button>
                  <img src="./ModifyIcon.svg" alt="modify"></img>
                </button>
                <button
                  onClick={() => {
                    if ("id" in information) {
                      deleteFornitore(String(information.id));
                    }
                  }}
                >
                  <img src="./DeleteIcon.svg" alt="delete" className="ml-1" />
                </button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
