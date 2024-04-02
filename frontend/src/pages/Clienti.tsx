import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import ListElementComponent from "../components/ListElementComponent/ListELementComponent";
import { useState,useEffect } from "react";
import axios from "axios";

interface Fornitori {
  id: string;
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  referente: string;
  partita_iva: string;
  sito_web: string;
  iban: string;
}
interface Clienti {
  id: number;
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
}

interface Acquisti {
  id: number;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: string;
  codice_fornitore: number;
}

interface Vendite {
  id: number;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: string;
  codice_cliente: number;
}

export default function Clienti() {
  const filters = [
    {
      title: "Stato",
      options: ["In arrivo", "In magazzino", "Venduto"],
    },
    {
      title: "Capacità",
      options: ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"],
    },
    {
      title: "Condizione",
      options: ["Accettabile", "Ottimo", "Eccellente"],
    },
    {
      title: "Fotocamera",
      options: ["Singola", "Doppia", "Tripla"],
    },
    {
      title: "Colore",
      options: [
        "Nero",
        "Bianco",
        "Blu",
        "Rosso",
        "Verde",
        "Giallo",
        "Viola",
        "Arancione",
        "Rosa",
        "Grigio",
      ],
    },
  ];
  const fields = [
    "nome",
    "email",
    "telefono",
    "indirizzo",
  ];

  const [listaClienti, setListaClienti] = useState<Clienti[]>([]);

  useEffect(() => {
    const getClienti = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/radioapp/getClienti"
        );
        setListaClienti(res.data);
      } catch (error) {
        console.error("Failed to fetch Clienti:", error);
      }
    };
    getClienti();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row align-top relative mt-20">
      <div className="w-3/12 flex flex-col justify-center gap-6 fixed">
          <div className="w-full justify-center px-4">
            <ListElementComponent title={"clienti"} />
          </div>
          <div className="px-4 overflow-y-auto">
            <h2 className="text-2xl font-semibold">Filtro</h2>
            <hr className="h-2 border-t-2" />
            {filters.map((filter) => (
              <div key={filter.title}>
                <Filter title={filter.title} options={filter.options}  />
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="w-9/12 ml-[25%] flex justify-center px-8">
        <Table
            fields={fields}
            informations={listaClienti}
            setInformations={
              setListaClienti as React.Dispatch<
                React.SetStateAction<
                  Clienti[] | Vendite[] | Fornitori[] | Acquisti[]
                >
              >
            }/>
        </div>
      </div>
    </div>
  );
}