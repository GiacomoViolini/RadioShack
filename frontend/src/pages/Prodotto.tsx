// import { useEffect } from "react";
import { useEffect, useState } from "react";
import CardDetails from "../components/CardDetails/CardDetails";
import Navbar from "../components/Navbar/Navbar";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
// import axios from "axios";
interface Prodotto {
  id: number;
  nome: string;
  colore: string;
  capacità: number;
  anno_di_uscita: number;
  stato: string;
  condizione: string;
  fotocamera: string;
  dimensioni_schermo: number;
  prezzo_di_acquisto: number;
  prezzo_di_vendita: number;
  prezzo_consigliato: number;
  codice_acquisto: string;
  codice_vendita: string;
  quantità: number;
}
export default function Prodotto() {
  const [prodotti, setProdotti] = useState<Prodotto[]>([]);
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const checkedOptions = state.checkedOptions;

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:8000/radioapp/getProdotto/${params.id}`
      );
      setProdotti(res.data);
    }
    async function fetchFilteredData() {
      const res = await axios.post(
        `http://localhost:8000/radioapp/filterProdotto/${params.id}/`,
        {
          checkedOptions,
        }
      );
      setProdotti(res.data);
    }
    if (checkedOptions) {
      fetchFilteredData();
    } else {
      fetchData();
    }
  }, [params.id, checkedOptions]);
  
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="mt-20 px-4 grid grid-cols-3 gap-4">
        {prodotti.map((product: Prodotto) => (
          <CardDetails
            key={
              product.colore +
              product.capacità +
              product.condizione +
              product.stato
            }
            title={product.nome}
            capacità={product.capacità}
            colore={product.colore}
            anno_di_uscita={product.anno_di_uscita}
            quantità={product.quantità}
            stato={product.stato}
            condizione={product.condizione}
            fotocamera={product.fotocamera}
            dimensioni_schermo={product.dimensioni_schermo}
            prezzo_di_acquisto={product.prezzo_di_acquisto}
            prezzo_di_vendita={product.prezzo_di_vendita}
            prezzo_consigliato={product.prezzo_consigliato}
          />
        ))}
      </div>
    </div>
  );
}