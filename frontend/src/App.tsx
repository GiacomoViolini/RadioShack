import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistiche from "./pages/Statistiche";
import Prodotti from "./pages/Prodotti";
import Vendite from "./pages/Vendite";
import Prodotto from "./pages/Prodotto";
import Fornitori from "./pages/Fornitori";
import Acquisti from "./pages/Acquisti";
import Clienti from "./pages/Clienti";
import InsertFornitore from "./pages/InsertFornitore";
import ModificaFornitore from "./pages/ModificaFornitore";
import InsertAcquisto from "./pages/InsertAcquisto";
import InsertProdotto from "./pages/InsertProdotto";
import { useState } from "react";

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

function App() {
  const [data, setData] = useState<Prodotto[]>([]);

  const handleInsert = (newData: Prodotto) => {
    const existingData = data.find(
      (item) =>
        item.colore === newData.colore &&
        item.capacità === newData.capacità &&
        item.nome === newData.nome &&
        item.condizione === newData.condizione
    );

    if (existingData) {
      const updatedData = data.map((item) => {
        if (
          item.colore === newData.colore &&
          item.capacità === newData.capacità &&
          item.nome === newData.nome &&
          item.condizione === newData.condizione
        ) {
          return {
            ...item,
            quantità: item.quantità + newData.quantità,
          };
        }
        return item;
      });

      setData(updatedData);
    } else {
      setData([...data, newData]);
    }
  };
  const handleDelete = ({
    nome,
    quantità,
    condizione,
    colore,
    capacità,
    prezzo_di_acquisto,
  }: {
    nome: string;
    quantità: number;
    condizione: string;
    colore: string;
    capacità: number;
    prezzo_di_acquisto: number;
  }) => {
    const updatedData = data.filter(
      (item) =>
        item.nome !== nome &&
        item.quantità !== quantità &&
        item.condizione !== condizione &&
        item.colore !== colore &&
        item.capacità !== capacità &&
        item.prezzo_di_acquisto !== prezzo_di_acquisto
    );
    setData(updatedData);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" element={<Prodotti />} />
        <Route path="/prodotti/:id" element={<Prodotto />} />
        <Route path="/statistiche" element={<Statistiche />} />
        <Route path="/fornitori" element={<Fornitori />} />
        <Route path="/clienti" element={<Clienti />} />
        <Route path="/acquisti" element={<Acquisti />} />
        <Route path="/vendite" element={<Vendite />} />
        <Route path="/fornitori/inserisci" element={<InsertFornitore />} />
        <Route path="/fornitori/modifica/:id" element={<ModificaFornitore />} />
        <Route path="/acquisti/inserisci" element={<InsertAcquisto data={data} setData={setData} handleDelete={handleDelete} />} />
        <Route path="/acquisti/inserisci/prodotti" element={<InsertProdotto handleInsert={handleInsert} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
