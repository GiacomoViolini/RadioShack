import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import InstertElementButton from "../components/InsertElementButton/InsertElementButton";
import axios from "axios";
import { useState,useEffect } from "react";

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

export default function Fornitori() {
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
    "codice fornitore",
    "nome",
    "email",
    "telefono",
    "indirizzo",
    "referente",
    "partita iva",
    "sito web",
    "iban",
  ];

  const [listafornitori, setListafornitori] = useState<Fornitori[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFornitori = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/radioapp/getFornitori");
        setListafornitori(res.data);
      } catch (error) {
        console.error("Failed to fetch fornitori:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getFornitori();
  }, []);

  if (isLoading) {
    return null; // Or your custom loading component
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row align-top relative mt-20">
        <div className="w-2/12 flex flex-col justify-center gap-6 fixed">
          <div className="w-full justify-center px-4">
            <InstertElementButton title={"fornitore"} />
          </div>
          <div className="px-4 overflow-y-auto">
            <h2 className="text-2xl font-semibold">Filtro</h2>
            <hr className="h-2 border-t-2" />
            {/*
            {filters.map((filter) => (
              <div key={filter.title}>
                <Filter title={filter.title} options={filter.options} />
                <hr />
              </div>
            ))}*/}
          </div>
        </div>
        <div className="w-10/12 ml-[17%] flex justify-center px-8">
          <Table fields={fields} informations={listafornitori} />
        </div>
      </div>
    </div>
  );
}
