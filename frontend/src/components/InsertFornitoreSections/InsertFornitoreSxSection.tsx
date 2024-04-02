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
    <div className="w-full flex flex-col px-8">
      {fields.map((field) => {
        const fieldName = field.replace(" ", "_");
        return (
          <div className="h-2 flex-row justify-center border-black border-dashed border-t-2 border-b-2 flex items-center py-8 mx-16 my-4">
            <div className="w-80 flex gap-4 ml-4">
              <h2 className="text-black font-bold text-md">{field}</h2>
              <img
                className=""
                src={
                  field == "sito web"
                    ? "./SitoWebIcon.svg"
                    : "./TelefonoIcon.svg"
                }
                alt="icon"
              />
            </div>
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
        );
      })}
    </div>
  );
};

export default FirstColumn;