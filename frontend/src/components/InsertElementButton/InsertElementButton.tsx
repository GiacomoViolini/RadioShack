import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utils";
import { InsertElementButtonProps } from "../../interfaceHelper"; 

export default function InsertElementButton({
  title,
}: InsertElementButtonProps) {
  const isAcquisti = title === "acquisto";
  const isFornitori = title === "fornitore";
  const navigate = useNavigate();
  return (
    <button
      className="flex flex-row items-center justify-center gap-4 rounded-lg border-2 p-2 w-full border-slate-300 bg-zinc-900 hover:bg-zinc-800 transition-all duration-200"
      onClick={() => navigate(`/${title}/inserisci`)}
    >
      <img src="./InsertIcon.svg" className="h-6" alt="Insert Icon" />
      {(isAcquisti || isFornitori) && (
        <h2 className="text-lg font-bold">{`Inserisci ${capitalize(title)}`}</h2>
      )}
      {isAcquisti && (
        <img src="./Acquisti.svg" className="h-8 mt-2" alt="Acquisti Icon" />
      )}
      {isFornitori && (
        <img src="./Fornitori.svg" className="h-6" alt="Fornitori Icon" />
      )}
    </button>
  );
}
