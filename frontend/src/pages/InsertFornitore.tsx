import Navbar from "../components/Navbar/Navbar";
import { FormEvent, useState } from "react";
import axios from "axios";
import InsertFornitoreDxSection from "../components/InsertFornitoreSections/InsertFornitoreDxSection";
import { useNavigate } from "react-router-dom";
import { Fornitore } from "../interfaceHelper";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import ConfirmationToast from "../components/ConfirmationToast/ConfirmationToast";

export default function InsertFornitore() {
  const navigate = useNavigate();
  const initialFornitore: Fornitore = {
    id: 0,
    nome: "",
    email: "",
    telefono: "",
    indirizzo: "",
    referente: "",
    iban: "",
    quantità_articoli_acquistati: 0,
    capitale_investito: 0,
  };

  const [fornitore, setFornitore] = useState<Fornitore>(initialFornitore);
  const [flag, setFlag] = useState(false);

  const addFornitore = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFlag(true);
  };
  const fetchData = async () => {
    const res = await axios.post(
      "http://localhost:8000/radioapp/addFornitore/",
      fornitore
    );
    console.log(res.data);

    toast.success("Fornitore aggiunto con successo", {
      position: "top-center",
      autoClose: 2000,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      {flag && (
        <ConfirmationToast
          setFlag={setFlag}
          fetchData={fetchData}
          toastTitle={"Conferma Inserimento"}
          subtitle={"Sei sicuro di voler procedere?"}
        />
      )}
      <form
        className="bg-zinc-300 h-[82vh] mt-[4.5rem] rounded-lg grid grid-cols-3"
        onSubmit={(e) => addFornitore(e)}
      >
        <div className="col-span-1 bg-zinc-400 rounded-l-lg flex flex-col gap-10 justify-center items-center">
          <button
            type="submit"
            className="flex px-4 py-2 text-zinc-700 rounded-lg border-2 bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 w-fit justify-center gap-4 items-center"
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
