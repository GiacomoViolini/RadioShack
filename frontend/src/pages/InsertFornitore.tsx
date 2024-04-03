import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import InsertFornitoreSxSection from "../components/InsertFornitoreSections/InsertFornitoreSxSection";
import InsertFornitoreDxSection from "../components/InsertFornitoreSections/InsertFornitoreDxSection";
import { useNavigate } from "react-router-dom";
import { Fornitori } from "../interfaceHelper";

export default function InsertFornitore() {
  const navigate = useNavigate();
  const initialFornitore: Fornitori = {
    id:"",
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
      <div className="bg-zinc-300 h-[82vh] mt-[4.5rem] rounded-lg grid grid-cols-2">
        <div className="bg-zinc-400 rounded-l-lg flex flex-col gap-10 justify-center items-center">
          <button
            onClick={() => addFornitore()}
            className="flex border-2 px-4 py-2 rounded border-black bg-zinc-600 hover:bg-zinc-500 transition-all duration-200 w-fit justify-center gap-4 items-center"
          >
            <img
              src="/InsertIconVersion2.svg"
              alt="Insert Icon"
            />
            <h2 className="text-2xl font-semibold">
              Aggiungi Fornitore
            </h2>
          </button>
          <img
            src="/Fornitori.svg"
            className="h-64"
            alt="Fornitori Icon"
          />
          <InsertFornitoreSxSection
            fields={["sito web", "telefono"]}
            fornitore={fornitore}
            setFornitore={setFornitore}
          />
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
