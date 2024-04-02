import axios from "axios";
import { capitalize } from "../../utils";
import { useState } from "react";
interface TableProps {
  fields: string[];
  informations: Clienti[] | Vendite[] | Acquisti[] | Fornitori[];
  setInformations: React.Dispatch<React.SetStateAction<Clienti[] | Vendite[] | Acquisti[] | Fornitori[]>>;
}

interface Fornitori {
  id: string;
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  referente: string;
  partita_iva: string;
  sito_web: string;
  iban: string;
}
interface Clienti {
  id: number;
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
}

interface Acquisti {
  id: number;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: string;
  codice_fornitore: number;
}

interface Vendite {
  id: number;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: string;
  codice_cliente: number;
}

export default function Table({ fields, informations , setInformations }: TableProps) {
  const [flag,setFlag] = useState(false)
  const deleteFornitore = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/radioapp/deleteFornitore/${id}`);
      alert("Fornitore eliminato con successo")
      setInformations(informations.filter((info) => info.id !== id) as Fornitori[] | Clienti[] | Vendite[] | Acquisti[]);
    } catch (error) {
      console.error("Failed to delete fornitore:", error);
    }
  };
  
  return (
    <table className="border-spacing-y-1 shadow-sm shadow-slate-300 border text-center border-slate-300 w-full rounded-md overflow-hidden">
      <thead className="bg-slate-100 text-black ">
        <tr className="h-14 p-2 gap-2 ">
          {fields.map((field) => (
            <th key={field} className="mx-2">
              {capitalize(field)}
            </th>
          ))}
          { fields.includes("partita iva") || fields.includes("codice fornitore") ? (
            <>
            <th>Interagisci</th>
            </>
          ) : null}
        </tr>
      </thead>
      <tbody className="border-spacing-y-1 border xl:text-xs">
        {informations.map((information, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-spacing-y-1 h-12 gap-2 border p-2"
          >
            {information && Object.entries(information).map(([key, info]) => (
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
                      deleteFornitore(information.id);
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
