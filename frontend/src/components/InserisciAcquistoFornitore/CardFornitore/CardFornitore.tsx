import { Fornitori } from "../../../interfaceHelper";

interface CardFornitoreProps {
  fornitore: Fornitori;
  selectedFornitore: Fornitori | null;
  setSelectedFornitore: React.Dispatch<React.SetStateAction<Fornitori |null>>;
}

export default function CardFornitore({
  fornitore,
  selectedFornitore,
  setSelectedFornitore,
}: CardFornitoreProps) {
  return (
    <button
      className={`grid grid-cols-3 gap-4 border-[3px] border-zinc-200 rounded-lg items-center ${selectedFornitore == fornitore ? 'bg-zinc-900 border-black' : 'bg-zinc-700'} transition-all duration-200`}
      onClick={() => {setSelectedFornitore(fornitore)}}
    >
      <img
        src="/Fornitori.svg"
        className={`col-span-1 w-full h-full p-4  ${selectedFornitore == fornitore ? 'bg-zinc-800' : 'bg-zinc-300'} rounded-l-md transition-all duration-200`}
      />
      <div className="col-span-2 flex flex-col items-center py-4 gap-4">
        <h2 className="text-xl border-2 rounded-xl px-2 font-bold">
          Codice Fornitore : {fornitore.id}
        </h2>
        <h2 className="text-2xl font-bold">{fornitore.nome}</h2>
      </div>
    </button>
  );
}
