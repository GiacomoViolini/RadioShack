import { useNavigate } from "react-router-dom";

export default function InsertElementButton() {
  const navigate = useNavigate();
  return (
    <button
      className="flex flex-row items-center justify-center gap-4 rounded-lg border-2 p-2 w-full border-slate-300 bg-zinc-900 hover:bg-zinc-800 transition-all duration-200"
      onClick={() => navigate(`/fornitori/inserisci`)}
    >
      <img src="./InsertIcon.svg" className="h-6" alt="Insert Icon" />
      <h2 className="text-lg font-bold">{`Inserisci Fornitore`}</h2>
      <img src="./Fornitori.svg" className="h-6" alt="Fornitori Icon" />
    </button>
  );
}
