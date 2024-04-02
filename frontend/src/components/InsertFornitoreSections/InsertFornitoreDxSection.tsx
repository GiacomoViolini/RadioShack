import React from "react";

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
    <div className="col-span-1 bg-none h-[95vh] py-4 pt-10 flex flex-col justify-center px-10">
      {fields.map((field: string) => {
        const fieldName = field.replace(" ", "_");
        return (
          <div className="flex mx-16 bg-none flex-col justify-start my-4">
            <h2 className="pl-4 text-black font-bold text-md mb-2">{field}</h2>
            <div className="h-2 border-black border-dashed border-t-2 border-b-2 flex items-center py-8 px-4">
              <input
                type="text"
                name={fieldName}
                id={fieldName}
                className="w-full rounded-md py-1.5 pl-4 pr-20 h-8 text-md bg-opacity-90 border-2 border-black placeholder:text-white"
                placeholder="Es.jiguhyftouryit"
                value={fornitore[fieldName as keyof Fornitori] || ""}
                onChange={handleOnChange}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SecondColumn;