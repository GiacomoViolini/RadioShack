import axios from "axios";
import { capitalize } from "../../utils";
import { Fornitori, Acquisti, Clienti, Vendite, TableProps } from "../../interfaceHelper";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Bounce, toast } from "react-toastify";

export default function Table({
  fields,
  informations,
  setInformations,
  setFlag,
  confirmation,
}: TableProps) {
  const [checkBox, setCheckBox] = useState(false);
  const navigate = useNavigate();
  const [ID, setID] = useState<number|null>(null);

  useEffect(() => {
    if (ID !== null) {
      console.log(ID);
      addFornitore();
    }
  }, [ID]);

  const addFornitore = async () => {
    setFlag(true);
  };

  useEffect(() => {
    const DeleteData = async (ID : number) => {
      if (informations.some((info) => "iban" in info)) {
        await axios.delete(`http://localhost:8000/radioapp/deleteFornitore/${ID}`);
      } else {
        await axios.delete(`http://localhost:8000/radioapp/deleteAcquisto/${ID}`);
      }
      console.log(ID)
      const newInfo = informations.filter((info) => info.id !== ID) as
        | Fornitori[]
        | Clienti[]
        | Vendite[]
        | Acquisti[];
      setInformations(newInfo);
      toast.success("Fornitore eliminato con successo", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    };
    if (confirmation) {
      DeleteData(ID);
    }
  }, [confirmation]);

  const deleteFornitore = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:8000/radioapp/deleteFornitore/${id}`
      );
      const newInfo = informations.filter((info) => info.id !== id) as
        | Fornitori[]
        | Clienti[]
        | Vendite[]
        | Acquisti[];
      setInformations(newInfo);
    } catch (error) {
      console.error("Failed to delete fornitore:", error);
    }
  };

  const deleteAcquisto = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/radioapp/deleteAcquisto/${id}`);
      setInformations(
        informations.filter((info) => info.id !== id) as
          | Fornitori[]
          | Clienti[]
          | Vendite[]
          | Acquisti[]
      );
    } catch (error) {
      console.error("Failed to delete acquisto:", error);
    }
  };

  const flag1 = informations.some(
    (info) => "iban" in info || "codice_fornitore" in info
  );

  return (
    <table className="shadow-sm table-fixed shadow-slate-300 border text-center border-slate-300 w-full rounded-md overflow-hidden">
      <thead className="bg-slate-100 text-black ">
        <tr>
          {fields.map((field) => (
            <th className="h-20" key={field}>
              {capitalize(field)}
            </th>
          ))}
          {flag1 && <th>Interagisci</th>}
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
            {flag1 && (
              <td
                className="flex flex-row gap-1 justify-center items-center pt-2 mx-2"
                key={""}
              >
                {checkBox ? 
                  <button>
                    <img src="./InNegozioIcon.svg" alt="modify" className=" h-8 p-1"></img>
                  </button>
                 : null}
                <button
                  onClick={() => {
                    if ("id" in information && "iban") {
                      navigate(`/fornitori/modifica/${information.id}`);
                    } else {
                      navigate(`/acquisti/modifica/${information.id}`);
                    }
                  }}
                >
                  <img src="./ModifyIcon.svg" className="h-8 p-1" alt="modify"></img>
                </button>
                <button
                  onClick={() => {
                      setID(information.id)
                  }}
                >
                  <img src="./DeleteIcon.svg" alt="delete" className="h-8 p-1" />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
