import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";

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

export default function InsertFornitore() {
  const initialFornitore: Fornitori = {
    nome: "",
    email: "",
    telefono: "",
    indirizzo: "",
    referente: "",
    partita_iva: "",
    sito_web: "",
    iban: "",
  };

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [referente, setReferente] = useState("");
  const [partita_iva, setPartita_iva] = useState("");
  const [sito_web, setSito_web] = useState("");
  const [iban, setIban] = useState("");
  const [info, setInfo] = useState(initialFornitore);

  const fields = [
    "nome",
    "email",
    "telefono",
    "indirizzo",
    "referente",
    "partita_iva",
  ];

  const map: {
    [key: string]: [string, React.Dispatch<React.SetStateAction<string>>];
  } = {
    nome: [nome, setNome],
    email: [email, setEmail],
    telefono: [telefono, setTelefono],
    indirizzo: [indirizzo, setIndirizzo],
    referente: [referente, setReferente],
    partita_iva: [partita_iva, setPartita_iva],
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    setInfo({ ...info, [fieldName]: e.target.value });
    if (map[fieldName]) {
      map[fieldName][1](e.target.value);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="bg-slate-50 h-[90vh] mb-20 mt-24 rounded-lg grid grid-cols-2">
        <div className="col-span-1 bg-gray-200  rounded-l-lg">
          <h2></h2>
        </div>
        <div className="col-span-1 bg-none h-[80vh] py-4 pt-16">
          {fields.map((field) => {
            const fieldName = field.replace(" ", "_");
            return (
              <div className="flex mx-16 bg-none flex-col justify-start my-4">
                <h2 className="pl-4 text-black font-bold text-md mb-2">
                  {field}
                </h2>
                <div className="h-2 border-black border-dashed border-t-2 border-b-2 flex items-center py-8 px-4">
                  <input
                    type="text"
                    name={fieldName}
                    id={fieldName}
                    className="w-full rounded-md py-1.5 pl-4 pr-20 h-8 text-md bg-opacity-90 border-2 border-black placeholder:text-white"
                    placeholder="Es.jiguhyftouryit"
                    value={map[fieldName][0] || ""}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
