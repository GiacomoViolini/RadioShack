import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import ListElementComponent from "../components/ListElementComponent/ListELementComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { Vendite,Acquisti,Fornitori,Clienti } from "../interfaceHelper";

export default function VenditeComponent() {
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
    "costo",
    "quantità_articoli_acquistati",
    "data_acquisto",
    "codice_cliente",
  ];

  const [listaVendite, setListaVendite] = useState<Vendite[]>([]);

  useEffect(() => {
    const getVendite = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/radioapp/getVendite"
        );

        setListaVendite(res.data);
      } catch (error) {
        console.error("Failed to fetch Vendite:", error);
      }
    };
    getVendite();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row align-top relative mt-20">
        <div className="w-2/12 flex flex-col justify-center gap-6 fixed">
          <div className="w-full justify-center px-4">
            <ListElementComponent title={"vendite"} />
          </div>
          <div className="px-4 overflow-y-auto">
            <h2 className="text-2xl font-semibold">Filtro</h2>
            <hr className="h-2 border-t-2" />
            {filters.map((filter) => (
              <div key={filter.title}>
                {/*<Filter title={filter.title} options={filter.options} />*/}
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="w-9/12 ml-[25%] flex justify-center px-8">
          <Table
            fields={fields}
            informations={listaVendite}
            setInformations={
              setListaVendite as React.Dispatch<
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