import Navbar from "../components/Navbar/Navbar";
import { useState} from "react";
import axios from "axios";
import InsertFornitoreSxSection from "../components/InsertFornitoreSections/InsertFornitoreSxSection";
import InsertFornitoreDxSection from "../components/InsertFornitoreSections/InsertFornitoreDxSection";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  const [fornitore, setFornitore] = useState<Fornitori>(initialFornitore);

  const addFornitore = async () => {
    const res = await axios.post(
      "http://localhost:8000/radioapp/addFornitore/",
      fornitore
    );
    console.log(res.data);
    alert("Fornitore aggiunto con successo");
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="bg-slate-50 h-[95vh] mb-20 mt-24 rounded-lg grid grid-cols-2">
        <div className="col-span-1 bg-gray-200  rounded-l-lg flex flex-col justify-center">
          <div className="col-span-1 bg-gray-200  rounded-l-lg flex flex-col justify-center">
            <button
              onClick={() => addFornitore()}
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
            <InsertFornitoreSxSection
              fields={["sito web", "telefono"]}
              fornitore={fornitore}
              setFornitore={setFornitore}
            />
          </div>
        </div>
        <InsertFornitoreDxSection
          fields={[
            "nome",
            "email",
            "iban",
            "indirizzo",
            "referente",
            "partita_iva",
          ]}
          fornitore={fornitore}
          setFornitore={setFornitore}
        />
      </div>
    </div>
  );
}
