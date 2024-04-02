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

const FirstColumn: React.FC<InsertFornitoreSxSectionProps> = ({
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
    <div className="w-full flex flex-col px-16 gap-4">
      {fields.map((field) => {
        const fieldName = field.replace(" ", "_");
        return (
          <div className="flex justify-center items-center">
              <h2 className="text-black text-lg font-semibold mr-2">{capitalize(field)}</h2>
              <img
                className="h-6 w-6 object-contain"
                src={
                  field == "sito web"
                    ? "/SitoWebIcon.svg"
                    : "/TelefonoIcon.svg"
                }
                alt="Icon"
              />
            <input
              type="text"
              name={fieldName}
              id={fieldName}
              className="rounded-md w-60 px-2 ml-20 text-md bg-opacity-90 border-2 border-black placeholder:text-zinc-300"
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

export default FirstColumn;
