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
    nome: "Iphone",
    colore: "Blu",
    capacità: 64,
    anno_di_uscita: 2015,
    stato: "In arrivo",
    condizione: "Accettabile",
    fotocamera: "Singola",
    dimensioni_schermo: 4.0,
    prezzo_di_acquisto: 300,
    prezzo_consigliato: 300,
    quantità: 1,
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
            <label htmlFor="nome">Nome (Iphone..)</label>
            <input
              type="text"
              id="nome"
              className="p-2 rounded-lg border-2"
              value={prodotto.nome}
              onChange={(e) =>
                setProdotto({ ...prodotto, nome: e.target.value })
              }
              required
              pattern="^Iphone*"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="colore">Colore</label>
            <div className="color-options justify-center items-center">
              <input
                type="radio"
                id="rosso"
                name="colore"
                value="Rosso"
                className="bg-red-500"
                checked={prodotto.colore === "Rosso"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="rosso" className="color-option red" />
              <input
                type="radio"
                id="blu"
                name="colore"
                value="Blu"
                checked={prodotto.colore === "Blu"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="blu" className="color-option blue" />
              <input
                type="radio"
                id="verde"
                name="colore"
                value="Verde"
                checked={prodotto.colore === "Verde"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="verde" className="color-option green" />
              <input
                type="radio"
                id="giallo"
                name="colore"
                value="Giallo"
                checked={prodotto.colore === "Giallo"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="giallo" className="color-option yellow" />
              <input
                type="radio"
                id="nero"
                name="colore"
                value="Nero"
                checked={prodotto.colore === "Nero"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="nero" className="color-option black" />
              <input
                type="radio"
                id="bianco"
                name="colore"
                value="Bianco"
                checked={prodotto.colore === "Bianco"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="bianco" className="color-option white" />
              <input
                type="radio"
                id="viola"
                name="colore"
                value="Viola"
                checked={prodotto.colore === "Viola"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="viola" className="color-option purple" />
              <input
                type="radio"
                id="arancione"
                name="colore"
                value="Arancione"
                checked={prodotto.colore === "Arancione"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="arancione" className="color-option orange" />
              <input
                type="radio"
                id="rosa"
                name="colore"
                value="Rosa"
                checked={prodotto.colore === "Rosa"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="rosa" className="color-option pink" />
              <input
                type="radio"
                id="grigio"
                name="colore"
                value="Grigio"
                checked={prodotto.colore === "Grigio"}
                onChange={(e) =>
                  setProdotto({ ...prodotto, colore: e.target.value })
                }
              />
              <label htmlFor="grigio" className="color-option gray" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="capacità">Capacità</label>
            <select
              id="capacità"
              className="p-2 rounded-lg border-2"
              value={prodotto.capacità}
              onChange={(e) =>
                setProdotto({ ...prodotto, capacità: parseInt(e.target.value) })
              }
              required
            >
              <option className="option" value={64}>
                64 GB
              </option>
              <option value={128}>128 GB</option>
              <option value={256}>256 GB</option>
              <option value={512}>512 GB</option>
              <option value={1024}>1 TB</option>
            </select>
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
              min="2015"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="condizione">Condizione</label>
            <select
              id="condizione"
              className="p-2 rounded-lg border-2"
              value={prodotto.condizione}
              onChange={(e) =>
                setProdotto({ ...prodotto, condizione: e.target.value })
              }
              required
            >
              <option value="Accettabile">Accettabile</option>
              <option value="Ottimo">Ottimo</option>
              <option value="Eccellente">Eccellente</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="fotocamera">Fotocamera</label>
            <select
              id="fotocamera"
              className="p-2 rounded-lg border-2"
              value={prodotto.fotocamera}
              onChange={(e) =>
                setProdotto({ ...prodotto, fotocamera: e.target.value })
              }
              required
            >
              <option value="Singola">Singola</option>
              <option value="Doppia">Doppia</option>
              <option value="Tripla">Tripla</option>
            </select>
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
              min={4.0}
              max={7.0}
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
              min={1}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
