import Navbar from "../components/Navbar/Navbar";
import { FormEvent, useState } from "react";
import axios from "axios";
import InsertFornitoreDxSection from "../components/InsertFornitoreSections/InsertFornitoreDxSection";
import { useNavigate } from "react-router-dom";
import { Fornitori } from "../interfaceHelper";

export default function InsertFornitore() {
  const navigate = useNavigate();
  const initialFornitore: Fornitori = {
    id: "",
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

  const addFornitore = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <form
        className="bg-zinc-300 h-[82vh] mt-[4.5rem] rounded-lg grid grid-cols-3"
        onSubmit={(e) => addFornitore(e)}
      >
        <div className="col-span-1 bg-zinc-400 rounded-l-lg flex flex-col gap-10 justify-center items-center">
          <button
            type="submit"
            className="flex px-4 py-2 rounded-lg border-2 bg-zinc-600 hover:bg-zinc-500 transition-all duration-200 w-fit justify-center gap-4 items-center"
          >
            <img src="/InsertIconVersion2.svg" alt="Insert Icon" />
            <h2 className="text-2xl font-semibold">Aggiungi Fornitore</h2>
          </button>
          <img src="/Fornitori.svg" className="h-64" alt="Fornitori Icon" />
        </div>
        <InsertFornitoreDxSection
          fornitore={fornitore}
          setFornitore={setFornitore}
        />
      </form>
    </div>
  );
}
