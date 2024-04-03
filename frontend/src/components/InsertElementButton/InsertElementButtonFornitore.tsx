import { useNavigate } from "react-router-dom";

export default function InsertElementButton() {
  const navigate = useNavigate();
  return (
    // <button
    //   className="flex flex-row items-center justify-center gap-4 rounded-lg border-2 p-2 w-full border-slate-300 bg-zinc-900 hover:bg-zinc-800 transition-all duration-200"
    //   onClick={() => navigate(`/fornitori/inserisci`)}
    // >
    //   <img src="./InsertIcon.svg" className="h-6" alt="Insert Icon" />
    //   <h2 className="text-lg font-bold">{`Inserisci Fornitore`}</h2>
    //   <img src="./Fornitori.svg" className="h-6" alt="Fornitori Icon" />
    // </button>
    <button
          className="bg-zinc-800 hover:bg-zinc-900 rounded-full p-2 border-2"
          onClick={() => navigate("/fornitori/inserisci")}
        >
          <img src="/InsertIcon.svg" className="w-9 h-9" />
        </button>
  );
}
