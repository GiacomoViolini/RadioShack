import React from "react";
import { capitalize } from "../../utils";
interface Fornitori {
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  referente: string;
  partita_iva: string;
  sito_web: string;
  iban: string;
}

interface InsertFornitoreSxSectionProps {
  fields: string[];
  fornitore: Fornitori;
  setFornitore: React.Dispatch<React.SetStateAction<Fornitori>>;
}

const SecondColumn: React.FC<InsertFornitoreSxSectionProps> = ({
  fields,
  fornitore,
  setFornitore,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFornitore({
      ...fornitore,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col justify-center px-10 gap-4">
      {fields.map((field: string) => {
        const fieldName = field.replace("_", " ");
        return (
          <div className="flex flex-col gap-1">
            <h2 className="text-zinc-800 font-semibold">{capitalize(fieldName)}</h2>
            <hr className="h-2 border-t-2 border-zinc-400" />
            <input
              type="text"
              name={fieldName}
              id={fieldName}
              className="w-full rounded py-1 px-2 border-2 border-zinc-800 placeholder:text-zinc-200"
              placeholder="Es.jiguhyftouryit"
              value={fornitore[fieldName as keyof Fornitori] || ""}
              onChange={handleOnChange}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SecondColumn;
