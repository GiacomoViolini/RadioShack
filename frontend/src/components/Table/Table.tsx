import visualizeIcon from "/VisualizeIcon.svg";
import modifyIcon from "/ModifyIcon.svg";
import deleteIcon from "/DeleteIcon.svg";
import axios from "axios";

interface TableProps {
  fields: string[];
  informations: Clienti[] | Vendite[] | Acquisti[] | Fornitori[];
}

interface Fornitori {
  codice_fornitore: string;
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
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
}

interface Acquisti {
  codice_acquisto: string;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: Date;
  codice_fornitore: string;
}

interface Vendite {
  codice_vendita: string;
  codice_cliente: string;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: Date;
}

export default function Table({ fields, informations }: TableProps) {
  const deleteFornitore = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/radioapp/deleteFornitore/${id}`);
      // After deleting, you can update the state to remove the deleted fornitore from the list
      // Or you can reload the page to get the updated list
      window.location.reload();
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
              {field}
            </th>
          ))}
          {Object.keys(informations[0]).length > 4 &&
          !fields.includes("codice vendita") ? (
            <th>Visualizza</th>
          ) : null}
        </tr>
      </thead>
      <tbody className="border-spacing-y-1 border xl:text-xs">
        {informations.map((information, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-spacing-y-1 h-12 gap-2 border p-2"
          >
            {Object.entries(information).map(([key, info]) => (
              <td key={key} className="mx-2">
                {info instanceof Date ? info.toLocaleString() : info}
              </td>
            ))}
            {Object.keys(informations[0]).length > 4 &&
            !("codice_vendita" in information) ? (
              <td
                className="flex flex-row gap-1 justify-center items-center pt-4 mx-2"
                key={""}
              >
                <button>
                  <img src={visualizeIcon} alt="visualize"></img>
                </button>
                <button>
                  <img src={modifyIcon} alt="modify"></img>
                </button>
                <button onClick={() => deleteFornitore(informations.codice_fornitore)}>
                  <img src={deleteIcon} alt="delete" className="ml-1"></img>
                </button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
