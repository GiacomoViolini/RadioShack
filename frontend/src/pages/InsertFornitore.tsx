import Navbar from "../components/Navbar/Navbar";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import InsertFornitoreDxSection from "../components/InsertFornitoreSections/InsertFornitoreDxSection";
import { useNavigate } from "react-router-dom";
import { Fornitori } from "../interfaceHelper";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import ConfirmationToast from "../components/ConfirmationToast/ConfirmationToast";

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
    quantità_articoli_acquistati: 0,
    capitale_investito: 0,
  };

  const [fornitore, setFornitore] = useState<Fornitori>(initialFornitore);
  const [flag, setFlag] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [counter, setCounter] = useState<number>(0);

  const addFornitore = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFlag(true);
  };

  useEffect(() => {
    function ShowCancelToast() {
      if (flag == false && confirmation == false && counter == 1) {
        toast.error("Annulamento aggiunta fornitore", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setCounter(0);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    }
    ShowCancelToast()
    console.log(counter)
  }, [counter]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(
        "http://localhost:8000/radioapp/addFornitore/",
        fornitore
      );
      console.log(res.data);

      toast.success("Fornitore aggiunto con successo", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    };

    if (confirmation) {
      fetchData();
    }
  }, [confirmation]);

  return (
    <div className="flex flex-col">
      <Navbar />
      {flag ? (
        <ConfirmationToast
          setFlag={setFlag}
          setConfirmation={setConfirmation}
          setCounter={setCounter}
          toastTitle={"Conferma Inserimento"}
          subtitle={"Sei sicuro di voler procedere?"}
        />
      ) : null}
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
