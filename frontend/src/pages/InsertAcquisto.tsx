import { useEffect, useState } from "react";
import ContainerFornitore from "../components/InserisciAcquistoFornitore/ContainerFornitore/ContainerFornitore";
import Navbar from "../components/Navbar/Navbar";
import { Fornitori } from "../interfaceHelper";
import axios from "axios";
import ContainerProdotto from "../components/InserisciAcquistoProdotto/ContainerProdotto/ContainerProdotto";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import ConfirmationToast from "../components/ConfirmationToast/ConfirmationToast";

interface Prodotto {
  nome: string;
  colore: string;
  capacità: number;
  anno_di_uscita: number;
  stato: string;
  condizione: string;
  fotocamera: string;
  dimensioni_schermo: number;
  prezzo_di_acquisto: number;
  prezzo_consigliato: number;
  quantità: number;
}

export default function InsertAcquisto({
  data,
  handleDelete,
  setData,
}: {
  data: Prodotto[];
  handleDelete: (newData: Prodotto) => void;
  setData: React.Dispatch<React.SetStateAction<Prodotto[]>>;
}) {
  const [fornitori, setFornitori] = useState<Fornitori[]>([]);
  const [selectedFornitore, setSelectedFornitore] = useState<Fornitori | null>(
    null
  );
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  function navigateTo(url: string) {
    navigate(`/${url}`);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "http://localhost:8000/radioapp/getFornitori"
      );
      setFornitori(res.data);
    }
    fetchData();
  }, []);

  const addAcquisto = async () => {
    setFlag(true);
  };
  
  const fetchData = async () => {
    const handlePost = async () => {
      console.log(data);
      const acquisto = {
        codice_fornitore: selectedFornitore?.id,
        costo: data.reduce(
          (acc, product) => acc + product.prezzo_di_acquisto * product.quantità,
          0
        ),
        quantità_articoli_acquistati: data.reduce(
          (acc, product) => acc + product.quantità,
          0
        ),
      };
      if (selectedFornitore && acquisto.quantità_articoli_acquistati > 0) {
        const res = await axios.post(
          "http://localhost:8000/radioapp/insertAcquisto/",
          {
            acquisto,
          }
        );
        console.log(res.data.id);
        data.forEach(async (product) => {
          const prodotto = {
            ...product,
            codice_acquisto: res.data.id,
          };
          await axios.post("http://localhost:8000/radioapp/insertProdotto/", {
            prodotto,
          });
        });
        setData([]);
        setSelectedFornitore(null);
        navigateTo("acquisti")
      }
    };
    handlePost()
    toast.success("Acquisto aggiunto con successo", {
      position: "top-center",
      autoClose: 1000,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
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
      <div className="flex mt-14">
        <div className="flex flex-col gap-2 w-3/12 fixed p-6">
          <h2 className="text-3xl font-bold">Ordine</h2>
          <hr />
          <h2 className="text-lg font-semibold">
            Fornitore selezionato:{" "}
            {selectedFornitore ? selectedFornitore.nome : "Nessuno"}
          </h2>
          <h2 className="text-lg font-semibold">Prodotti selezionati: </h2>
          <ul className=" px-4 list-disc">
            {data.map((product: Prodotto) => (
              <li key={product.nome + product.quantità + product.condizione}>
                {product.quantità}x {product.nome} ({product.colore},{" "}
                {product.capacità}, {product.condizione}){" "}
                {product.prezzo_di_acquisto * product.quantità}€
              </li>
            ))}
          </ul>
          <hr />
          <h2 className="text-lg font-semibold">
            Totale:{" "}
            {data.reduce(
              (acc, product) =>
                acc + product.prezzo_di_acquisto * product.quantità,
              0
            )}
            €
          </h2>
          <button
            className="bg-zinc-600 border-2 rounded-lg p-2 mt-4 font-semibold text-lg"
            onClick={addAcquisto}
          >
            Aggiungi Ordine
          </button>
        </div>
        <div className="flex flex-col gap-10 ml-[25%] w-9/12 p-4">
          <ContainerFornitore
            fornitori={fornitori}
            selectedFornitore={selectedFornitore}
            setSelectedFornitore={setSelectedFornitore}
          />
          <ContainerProdotto data={data} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
