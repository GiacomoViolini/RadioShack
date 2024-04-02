import { useNavigate } from "react-router-dom";
import { InsertElementButtonProps } from "../../interfaceHelper"; 

export default function InsertElementButton({
  title,
}: InsertElementButtonProps) {
  const isAcquisti = title === "acquisto";
  const isFornitori = title === "fornitore";
  const navigate = useNavigate();
  function navigateTo(url: string) {
    navigate(`/${url}`);
  }
  return (
    <button
      className="flex flex-row items-center justify-center gap-4 rounded-full border-2 p-2 w-full border-slate-300 "
      onClick={() => navigateTo(`Insert${title}`)}
    >
      <img src="./InsertIcon.svg" className="h-6" alt="Insert Icon" />
      {isAcquisti && (
        <h2 className="text-lg font-bold">{`Insert ${title}`}</h2>
      )}
      {isFornitori && (
        <h2 className="text-sm font-bold">{`Insert ${title}`}</h2>
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
