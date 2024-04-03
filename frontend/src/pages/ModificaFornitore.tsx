import Navbar from "../components/Navbar/Navbar";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import SecondColumnModifyFornitore from "../components/ModifyElementButton/ModifyFornitoreSection";
import { useNavigate, useParams } from "react-router-dom";
import { Fornitore } from "../interfaceHelper";

export default function ModificaFornitore() {
  const navigate = useNavigate();
  const initialFornitore: Fornitore = {
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

  const [fornitore, setFornitore] = useState<Fornitore>(initialFornitore);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:8000/radioapp/getfornitore/${params.id}`
      );
      console.log(res)
      setFornitore(res.data);
    }
    fetchData();
  }, [params.id]);

  const ModifyFornitore = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:8000/radioapp/modifyFornitore/${params.id}`,
      fornitore
    );
    console.log(res.data);
    alert("Fornitore modificato con successo");
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <form
        className="bg-zinc-300 h-[82vh] mt-[4.5rem] rounded-lg grid grid-cols-3"
        onSubmit={(e) => ModifyFornitore(e)}
      >
        <div className="col-span-1 bg-zinc-400 rounded-l-lg flex flex-col gap-10 justify-center items-center">
          <button
            type="submit"
            className="flex px-4 py-2 text-zinc-700 rounded-lg border-2 bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 w-fit justify-center gap-4 items-center"
          >
            <img src="/InsertIconVersion2.svg" alt="Insert Icon" />
            <h2 className="text-2xl font-semibold">Modifica Fornitore</h2>
          </button>
          <img src="/Fornitori.svg" className="h-64" alt="Fornitori Icon" />
        </div>
        <SecondColumnModifyFornitore
          fornitore={fornitore}
          setFornitore={setFornitore}
        />
      </form>
    </div>
  );
}
