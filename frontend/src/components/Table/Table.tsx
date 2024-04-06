import { capitalize } from "../../utils";
import { TableProps } from "../../interfaceHelper";
import { useNavigate } from "react-router-dom";

export default function Table({
  fields,
  informations,
  setId,
  setFlag,
  setFlag2,
}: TableProps) {
  const navigate = useNavigate();

  const deleteFornitore = async (id: number) => {
    if (setId) {
      setId(id);
    }
    if (setFlag) {
      setFlag(true);
    }
  };

  const deleteAcquisto = async (id: number) => {
    if (setId) {
      setId(id);
    }
    if (setFlag) {
      setFlag(true);
    }
  };

  const ChangeStatoAcquisto = async (id: number) => {
    if (setId) {
      setId(id);
    }
    if (setFlag2) {
      setFlag2(true);
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
                {"stato" in information && information.stato == "Consegnato" ? (
                  <div className=" ml-4 text-lg">✅</div>
                ) : (
                  <button
                    onClick={() => {
                      if ("id" in information && "iban" in information) {
                        navigate(`/fornitori/modifica/${information.id}`);
                      } else {
                        ChangeStatoAcquisto(information.id);
                      }
                    }}
                  >
                    <img
                      src={
                        "iban" in information
                          ? "/ModifyIcon.svg"
                          : "/InNegozioIcon.svg"
                      }
                      className="h-8 p-1"
                      alt="modify"
                    />
                  </button>
                )}
                <button
                  onClick={() => {
                    if ("id" in information && "iban" in information) {
                      deleteFornitore(information.id);
                    } else {
                      deleteAcquisto(information.id);
                    }
                  }}
                >
                  <img src="/DeleteIcon.svg" alt="delete" className="h-8 p-1" />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
