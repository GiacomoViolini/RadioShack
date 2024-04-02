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
    const initialFornitore = {
      nome: "",
      email: "",
      telefono: "",
      indirizzo: "",
      referente: "",
      partita_iva: "",
      sito_web: "",
      iban: "",
    };
  
    const [aux, setAux] = useState("")
    const [info, setInfo] = useState(initialFornitore);
  
    const fields = [
      "nome",
      "email",
      "telefono",
      "indirizzo",
      "referente",
      "partita iva",
    ];
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInfo({ ...info, [event.target.name]: event.target.value });
    };
  
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className="bg-slate-50 h-[90vh] mb-20 mt-24 rounded-lg grid grid-cols-2">
          <div className="col-span-1 bg-gray-200  rounded-l-lg">
            <h2></h2>
          </div>
          <div className="col-span-1 bg-none h-[80vh] py-4">
            {fields.map((field) => (
              <div key={field} className="flex mx-16 bg-none flex-col justify-start my-4">
                <h2 className="pl-4 text-black font-bold text-md mb-2">{field}:</h2>
                <div className="h-2 border-black border-dashed border-t-2 border-b-2 flex items-center py-8 px-4">
                <input
                  type="text"
                  name={field.toLowerCase()}
                  id={field.toLowerCase()}
                  className="w-full rounded-md py-1.5 pl-4 pr-20 h-8 text-md bg-opacity-90 border-2 border-black placeholder:text-white"
                  placeholder="Es.jiguhyftouryit"
                  value={aux}
                  onChange={handleInputChange}
                />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
