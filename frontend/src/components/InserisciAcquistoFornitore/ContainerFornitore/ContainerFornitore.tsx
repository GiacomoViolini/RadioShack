import { Fornitori } from "../../../interfaceHelper";
import CardFornitore from "../CardFornitore/CardFornitore";

interface ContainerFornitoreProps {
  fornitori: Fornitori[];
  selectedFornitore: Fornitori | null;
  setSelectedFornitore: React.Dispatch<React.SetStateAction<Fornitori | null>>;
}

export default function ContainerFornitore({
  fornitori,
  selectedFornitore,
  setSelectedFornitore,
}: ContainerFornitoreProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-4xl text-center font-bold">Fornitori</h2>
      <hr className="h-2 border-t-2 w-60" />
      <div className="grid grid-cols-2 gap-y-8 gap-x-10">
        {fornitori.map((f) =>
          <CardFornitore key={f.id} fornitore={f} selectedFornitore={selectedFornitore} setSelectedFornitore={setSelectedFornitore}/>
        )}
      </div>
    </div>
  );
}
