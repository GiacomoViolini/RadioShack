import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import InstertElementButtonFornitore from "../components/InsertElementButton/InsertElementButtonFornitore";
import axios from "axios";
import { useState, useEffect } from "react";
import { Vendite, Acquisti, Fornitori, Clienti } from "../interfaceHelper";
import { FilterItems } from "../interfaceHelper";
import ConfirmationToast from "../components/ConfirmationToast/ConfirmationToast";
import { toast, Bounce } from "react-toastify";

export default function FornitoriComponent() {
  const filters = [
    {
      title: "Quantità Articoli Acquistati",
      options: ["< 10", "10 - 50", "50 - 100", "> 100"],
    },
    {
      title: "Capitale Investito",
      options: ["< 1000", "1000 - 5000", "5000 - 10000", "> 10000"],
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

  const [listafornitori, setListafornitori] = useState<Fornitori[]| Clienti[] | Vendite[] | Acquisti[]>([]);
  const [checkedOptions, setCheckedOptions] = useState<FilterItems[]>([]);
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const getFornitori = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/radioapp/getFornitori"
        );
        setListafornitori(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch fornitori:", error);
      }
    };
    const getFilteredFornitori = async () => {
      const res = await axios.post(
        "http://localhost:8000/radioapp/filterFornitori",
        { checkedOptions }
      );
      setListafornitori(res.data);
    };
    if (checkedOptions.length) {
      getFilteredFornitori();
    } else {
      getFornitori();
    }
  }, [checkedOptions]);

  const fetchData = async () => {
    console.log(id)
    if (id != 0) {
      await axios.delete(`http://localhost:8000/radioapp/deleteFornitore/${id}`);
      toast.success("Fornitore eliminato con successo", {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      const newInfo = listafornitori.filter((info) => info.id !== id) as
      | Fornitori[]
      | Clienti[]
      | Vendite[]
      | Acquisti[];
      setListafornitori(newInfo);
    }
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
      <div className="flex flex-row align-top mt-20">
        <div className="w-2/12 flex flex-col justify-center gap-6 fixed">
          <div className="w-full flex justify-center px-4">
            <InstertElementButtonFornitore />
          </div>
          <div className="px-4 ">
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
        <div className="w-10/12 ml-[17%] flex justify-center">
          <Table
            fields={fields}
            informations={listafornitori}
            setId={setId}
            setFlag={setFlag}
          />
        </div>
      </div>
    </div>
  );
}
