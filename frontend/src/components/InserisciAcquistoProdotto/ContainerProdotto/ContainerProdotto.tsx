import { useNavigate } from "react-router-dom";
import CardOrder from "../../CardOrder/CardOrder";

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

export default function ContainerProdotto({ data }: { data: Prodotto[] }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col relative">
      <div className="flex items-center justify-center">
        <div>
          <h2 className="text-4xl text-center font-bold">Prodotti</h2>
          <hr className="h-2 border-t-2 w-60" />
        </div>
        <button
          className="bg-zinc-700 rounded-full p-3 absolute top-0 left-[95%] border-2"
          onClick={() => navigate("/acquisti/inserisci/prodotti")}
        >
          <img src="/InsertIcon.svg" className="w-7 h-7" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.map((product: Prodotto) => (
          <CardOrder
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
            condizione={product.condizione}
            fotocamera={product.fotocamera}
            dimensioni_schermo={product.dimensioni_schermo}
            prezzo_di_acquisto={product.prezzo_di_acquisto}
            prezzo_consigliato={product.prezzo_consigliato}
          />
        ))}
      </div>
    </div>
  );
}
