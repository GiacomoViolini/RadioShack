import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import InstertElementButtonFornitore from "../components/InsertElementButton/InsertElementButtonFornitore";
import axios from "axios";
import { useState, useEffect } from "react";
import { Vendite, Acquisti, Fornitori, Clienti } from "../interfaceHelper";

export default function FornitoriComponent() {
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
    "id",
    "nome",
    "email",
    "telefono",
    "indirizzo",
    "referente",
    "iban",
    "quantità_articoli_acquistati",
    "capitale_investito",
  ];

  const [listafornitori, setListafornitori] = useState<Fornitori[]>([]);

  useEffect(() => {
    const getFornitori = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/radioapp/getFornitori"
        );
        setListafornitori(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Failed to fetch fornitori:", error);
      }
    };
    getFornitori();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row align-top mt-20">
        <div className="w-2/12 flex flex-col justify-center gap-6 fixed">
          <div className="w-full justify-center px-4">
            <InstertElementButtonFornitore />
          </div>
          <div className="px-4 ">
            <h2 className="text-2xl font-semibold">Filtro</h2>
            <hr className="h-2 border-t-2" />
            {filters.map((filter) => (
              <div key={filter.title}>
                {/* <Filter title={filter.title} options={filter.options} /> */}
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="w-10/12 ml-[17%] flex justify-center">
          <Table
            fields={fields}
            informations={listafornitori}
            setInformations={
              setListafornitori as React.Dispatch<
                React.SetStateAction<
                  Clienti[] | Vendite[] | Fornitori[] | Acquisti[]
                >
              >
            }
          />
        </div>
      </div>
    </div>
  );
}
