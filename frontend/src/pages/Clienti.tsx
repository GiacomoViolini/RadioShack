import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import ListElementComponent from "../components/ListElementComponent/ListELementComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { Cliente } from "../interfaceHelper";
import { FilterItems } from "../interfaceHelper";

export default function ClientiComponent() {
  const filters = [
    {
      title: "Quantità Articoli Acquistati",
      options: ["< 10", "10 - 50", "> 50"],
    },
    {
      title: "Capitale Investito",
      options: ["< 1000", "1000 - 5000", "> 5000"],
    },
  ];
  const fields = [
    "id",
    "nome",
    "email",
    "telefono",
    "indirizzo",
    "quantità_articoli_acquistati",
    "capitale_investito",
  ];

  const [listaClienti, setListaClienti] = useState<Cliente[]>([]);
  const [checkedOptions, setCheckedOptions] = useState<FilterItems[]>([]);

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
    const filterClienti = async () => {
      const res = await axios.post(
        "http://localhost:8000/radioapp/filterClienti/",
        { checkedOptions }
      );
      setListaClienti(res.data);
    };
    if (checkedOptions.length) {
      filterClienti();
    } else {
      getClienti();
    }
  }, [checkedOptions]);

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
                <Filter
                  title={filter.title}
                  options={filter.options}
                  checkedOptions={checkedOptions}
                  setCheckedOptions={setCheckedOptions}
                />
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="w-9/12 ml-[25%] flex justify-center px-8">
          <Table fields={fields} informations={listaClienti} />
        </div>
      </div>
    </div>
  );
}
