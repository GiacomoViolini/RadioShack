import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import InsertElementButtonAcquisto from "../components/InsertElementButton/InsertElementButtonAcquisto";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Vendita,
  Acquisto,
  Fornitore,
  Cliente,
  FilterItems,
} from "../interfaceHelper";
import ConfirmationToast from "../components/ConfirmationToast/ConfirmationToast";
import { toast, Bounce } from "react-toastify";

export default function AcquistiComponent() {
  const filters = [
    {
      title: "Costo",
      options: ["< 1000", "1000 - 5000", "> 5000"],
    },
    {
      title: "Quantità articoli acquistati",
      options: ["< 10", "10 - 50", "> 50"],
    },
  ];
  const [checkedOptions, setCheckedOptions] = useState<FilterItems[]>([]);
  const fields = [
    "id",
    "costo",
    "quantità articoli acquistati",
    "data acquisto",
    "codice fornitore",
    "stato",
  ];
  const [listaAcquisti, setListaAcquisti] = useState<
    Fornitore[] | Cliente[] | Vendita[] | Acquisto[]
  >([]);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const getAcquisti = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/radioapp/getAcquisti"
        );
        setListaAcquisti(res.data);
      } catch (error) {
        console.error("Failed to fetch Acquisti:", error);
      }
    };
    const getFilteredAcquisti = async () => {
      const res = await axios.post(
        "http://localhost:8000/radioapp/filterAcquisti/",
        { checkedOptions }
      );
      setListaAcquisti(res.data);
    };
    if (checkedOptions.length) {
      getFilteredAcquisti();
    } else {
      getAcquisti();
    }
  }, [checkedOptions]);


  const fetchData = async () => {
    console.log(id);
    if (id != 0) {
      await axios.delete(`http://localhost:8000/radioapp/deleteAcquisto/${id}`);
      toast.success("Acquisto eliminato con successo", {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      const newInfo = listaAcquisti.filter((info) => info.id !== id) as
        | Fornitore[]
        | Cliente[]
        | Vendita[]
        | Acquisto[];
      setListaAcquisti(newInfo);
    }
  };

  const fetchData1 = async () => {
    console.log(id);
    if (id != 0) {
      await axios.put(`http://localhost:8000/radioapp/changeStatoAcquisto/${id}/`);
      toast.success("Stato Acquisto aggiornato con successo", {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      const getAcquisti = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/radioapp/getAcquisti"
          );
          setListaAcquisti(res.data);
        } catch (error) {
          console.error("Failed to fetch Acquisti:", error);
        }
      };
      getAcquisti()
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      {flag && (
        <ConfirmationToast
          setFlag={setFlag}
          fetchData={fetchData}
          toastTitle={"Conferma Eliminazione Acquisto"}
          subtitle={"Sei sicuro di voler procedere?"}
        />
      )}
      {flag2 && (
        <ConfirmationToast
          setFlag={setFlag2}
          fetchData={fetchData1}
          toastTitle={"Conferma Aggiornamento Stato Acquisto"}
          subtitle={"Sei sicuro di voler procedere?"}
        />
      )}
      <div className="flex flex-row align-top relative mt-20">
        <div className="w-3/12 flex flex-col justify-center gap-6 fixed">
          <div className="w-full flex justify-center px-4">
            <InsertElementButtonAcquisto />
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
          <Table
            fields={fields}
            informations={listaAcquisti}
            setFlag={setFlag}
            setFlag2={setFlag2}
            setId={setId}
          />
        </div>
      </div>
    </div>
  );
}
