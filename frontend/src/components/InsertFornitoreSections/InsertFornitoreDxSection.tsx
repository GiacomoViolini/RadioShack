import React, { useState, useEffect } from "react";
import { capitalize } from "../../utils";
import { Fornitori } from "../../interfaceHelper";
import { InsertFornitoreSectionProps } from "../../interfaceHelper";

const SecondColumn: React.FC<InsertFornitoreSectionProps> = ({
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

  const [fieldNames, setFieldNames] = useState<string[]>([]);

  useEffect(() => {
    const updatedFields = fields.map((field: string) => {
      const updatedField = field.replace("_", " ");
      return capitalize(updatedField);
    });

    setFieldNames(updatedFields);
  }, [fields]);

  return (
    <form className="flex flex-col justify-center px-10 gap-4">
      {fieldNames.map((fieldName, index) => (
        <div key={index} className="flex flex-col gap-1">
          <label htmlFor={fieldName} className="text-zinc-800 font-semibold">{fieldName}</label>
          <hr className="h-2 border-t-2 border-zinc-400" />
          <input
            type="text"
            name={fieldName}
            id={fieldName}
            className="w-full rounded py-1 px-2 border-2 border-zinc-800 placeholder:text-zinc-200"
            placeholder={`Es.${fieldName}`}
            value={fornitore[fieldName as keyof Fornitori] || ""}
            onChange={handleOnChange}
          />
        </div>
      ))}
    </form>
  );
};

export default SecondColumn;