import { useEffect, useState } from "react";
import ContainerFornitore from "../components/InserisciAcquistoFornitore/ContainerFornitore/ContainerFornitore";
import Navbar from "../components/Navbar/Navbar";
import { Fornitori } from "../interfaceHelper";
import axios from "axios";
import ContainerProdotto from "../components/InserisciAcquistoProdotto/ContainerProdotto/ContainerProdotto";

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

export default function InsertAcquisto({ data }: { data: Prodotto[] }) {
  const [fornitori, setFornitori] = useState<Fornitori[]>([]);
  const [selectedFornitore, setSelectedFornitore] = useState<Fornitori | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "http://localhost:8000/radioapp/getFornitori"
      );
      setFornitori(res.data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
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
              <li>
                {product.quantità}x {product.nome} ({product.colore},{" "}
                {product.capacità}, {product.condizione})  {product.prezzo_di_acquisto * product.quantità}€
              </li>
            ))}
          </ul>
          <hr/>
          <h2 className="text-lg font-semibold">Totale: {data.reduce((acc, product) => acc + product.prezzo_di_acquisto * product.quantità, 0)}€</h2>
          <button className="bg-zinc-600 border-2 rounded-lg p-2 mt-4 font-semibold text-lg">
            Aggiungi Ordine
          </button>
        </div>
        <div className="flex flex-col gap-10 ml-[25%] w-9/12 p-4">
          <ContainerFornitore
            fornitori={fornitori}
            selectedFornitore={selectedFornitore}
            setSelectedFornitore={setSelectedFornitore}
          />
          <ContainerProdotto data={data} />
        </div>
      </div>
    </div>
  );
}
