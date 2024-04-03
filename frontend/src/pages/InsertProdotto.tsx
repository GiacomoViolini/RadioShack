import Navbar from "../components/Navbar/Navbar";
import "../pagestyles/InsertProdotto.css";
import { useState } from "react";
import { convertiColori } from "../utils";
import { useNavigate } from "react-router-dom";
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
export default function InsertProdotto({
  handleInsert,
}: {
  handleInsert: (newData: Prodotto) => void;
}) {
  const [prodotto, setProdotto] = useState<Prodotto>({
    nome: "",
    colore: "",
    capacità: 0,
    anno_di_uscita: 0,
    stato: "In arrivo",
    condizione: "",
    fotocamera: "",
    dimensioni_schermo: 0,
    prezzo_di_acquisto: 0,
    prezzo_consigliato: 0,
    quantità: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(prodotto);
    handleInsert(prodotto);
    navigate("/acquisti/inserisci");
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <form
        className="bg-zinc-300 h-[82vh] mt-[4.5rem] rounded-lg grid grid-cols-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div
          className="col-span-1 bg-zinc-400 rounded-l-lg flex flex-col gap-10 justify-center items-center"
          style={{
            backgroundColor: prodotto.colore
              ? convertiColori(prodotto.colore)
              : "",
          }}
        >
          <button
            type="submit"
            className="flex px-4 py-2 text-zinc-700 rounded-lg border-2 bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 w-fit justify-center gap-1 items-center"
          >
            <img src="/InsertIconVersion2.svg" alt="Insert Icon" />
            <h2 className="text-2xl font-semibold">Aggiungi Prodotto</h2>
          </button>
          <img src="/Prodotti.svg" className="h-64" alt="Fornitori Icon" />
        </div>
        <div className="col-span-2 grid grid-cols-2 justify-center p-10 gap-1 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              className="p-2 rounded-lg border-2"
              value={prodotto.nome}
              onChange={(e) =>
                setProdotto({ ...prodotto, nome: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="colore">Colore</label>
            <input
              type="text"
              id="colore"
              className="p-2 rounded-lg border-2"
              value={prodotto.colore}
              onChange={(e) =>
                setProdotto({ ...prodotto, colore: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="capacità">Capacità</label>
            <input
              type="number"
              id="capacità"
              className="p-2 rounded-lg border-2"
              value={prodotto.capacità}
              onChange={(e) =>
                setProdotto({ ...prodotto, capacità: +e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="anno_di_uscita">Anno di uscita</label>
            <input
              type="number"
              id="anno_di_uscita"
              className="p-2 rounded-lg border-2"
              value={prodotto.anno_di_uscita}
              onChange={(e) =>
                setProdotto({ ...prodotto, anno_di_uscita: +e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="condizione">Condizione</label>
            <input
              type="text"
              id="condizione"
              className="p-2 rounded-lg border-2"
              value={prodotto.condizione}
              onChange={(e) =>
                setProdotto({ ...prodotto, condizione: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="fotocamera">Fotocamera</label>
            <input
              type="text"
              id="fotocamera"
              className="p-2 rounded-lg border-2"
              value={prodotto.fotocamera}
              onChange={(e) =>
                setProdotto({ ...prodotto, fotocamera: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="dimensioni_schermo">Dimensioni Schermo</label>
            <input
              type="number"
              id="dimensioni_schermo"
              className="p-2 rounded-lg border-2"
              value={prodotto.dimensioni_schermo}
              onChange={(e) =>
                setProdotto({
                  ...prodotto,
                  dimensioni_schermo: +e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="prezzo_di_acquisto">Prezzo di Acquisto</label>
            <input
              type="number"
              id="prezzo_di_acquisto"
              className="p-2 rounded-lg border-2"
              value={prodotto.prezzo_di_acquisto}
              onChange={(e) =>
                setProdotto({
                  ...prodotto,
                  prezzo_di_acquisto: +e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="prezzo_consigliato">Prezzo Consigliato</label>
            <input
              type="number"
              id="prezzo_consigliato"
              className="p-2 rounded-lg border-2"
              value={prodotto.prezzo_consigliato}
              onChange={(e) =>
                setProdotto({
                  ...prodotto,
                  prezzo_consigliato: +e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="quantità">Quantità</label>
            <input
              type="number"
              id="quantità"
              className="p-2 rounded-lg border-2"
              value={prodotto.quantità}
              onChange={(e) =>
                setProdotto({ ...prodotto, quantità: +e.target.value })
              }
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}
