import Navbar from "../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

interface Fornitore {
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
  const [fornitore, setFornitore] = useState<Fornitore>({nome:"",email:"",telefono:"",indirizzo:"",referente:"",partita_iva:"",sito_web:"",iban:""});
  
  const fields = [
    "nome",
    "email",
    "iban",
    "indirizzo",
    "referente",
    "partita_iva",
  ];

  const fields1 = ["sito web", "telefono"];

  const map: {
    [key: string]: [string, React.Dispatch<React.SetStateAction<string>>];
  } = {
    nome: [nome, setNome],
    email: [email, setEmail],
    iban: [iban, setIban],
    indirizzo: [indirizzo, setIndirizzo],
    referente: [referente, setReferente],
    partita_iva: [partita_iva, setPartita_iva],
  };

  const map1: {
    [key: string]: [string, React.Dispatch<React.SetStateAction<string>>];
  } = {
    sito_web: [sito_web, setSito_web],
    telefono: [telefono, setTelefono],
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    setInfo({ ...info, [fieldName]: e.target.value });
    if (map[fieldName]) {
      map[fieldName][1](e.target.value);
    }
  };

  const handleOnChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    setInfo({ ...info, [fieldName]: e.target.value });
    if (map1[fieldName]) {
      map1[fieldName][1](e.target.value);
    }
  };

  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const addFornitore = async (info: Fornitori) => {
      for (let key in info) {
        if (info[key as keyof Fornitori] === "") {
          alert("All fields must be filled");
          return;
        }
      }
      const res2 = await axios.post(
        "http:localhost:8000/radioapp/addFornitore/",
        info
      );
      console.log(res2);
    };
  
    if (trigger > 0) {
      addFornitore(info);
    }
  }, [trigger]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="bg-slate-50 h-[95vh] mb-20 mt-24 rounded-lg grid grid-cols-2">
        <div className="col-span-1 bg-gray-200  rounded-l-lg flex flex-col justify-center">
          <button
            onClick={() => setTrigger(trigger + 1)}
            className="flex flex-row w-full mt-12 justify-center gap-4 items-cente hover:decoration-black hover:underline"
          >
            <img
              className=""
              src="./InsertIconVersion2.svg"
              alt="insert icon"
            />
            <h2 className="text-black text-3xl font-bold mb-2">
              Aggiungi Fornitore
            </h2>
          </button>
          <img
            src="./Fornitori.svg"
            className="h-64 mt-16 mb-12"
            alt="Fornitori Icon"
          />
          <div className="w-full flex flex-col px-8">
            {fields1.map((field) => {
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
                    value={map1[fieldName][0] || ""}
                    onChange={(e) => handleOnChange1(e)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-1 bg-none h-[95vh] py-4 pt-10 flex flex-col justify-center px-10">
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
