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
      <div className="flex mt-20">
        <div className="flex flex-col w-3/12 bg-red-500"></div>
        <div className="flex flex-col gap-10 w-9/12 p-4">
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
