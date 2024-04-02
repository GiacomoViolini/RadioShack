// import { useEffect } from "react";
import { useEffect, useState } from "react";
import CardDetails from "../components/CardDetails/CardDetails";
import Navbar from "../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { Prodotto } from "../interfaceHelper";

export default function ProdottoComponent() {
  const [prodotti, setProdotti] = useState<Prodotto[]>([]);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://localhost:8000/radioapp/getProdotto/${params.id}`
      );
      const data = await res.json();
      setProdotti(data);
    }
    fetchData();
  }, [params.id]);
  // const prodotti = [
  //   {
  //     nome: "Iphone 12",
  //     colore: "Rosso",
  //     capacità: 64,
  //     anno_di_uscita: 2020,
  //     stato: "In magazzino",
  //     condizione: "Eccellente",
  //     fotocamera: "Doppia",
  //     dimensioni_schermo: 6.1,
  //     prezzo_di_acquisto: 350,
  //     prezzo_di_vendita: -1,
  //     prezzo_consigliato: 450,
  //     codice_acquisto: "ACQ100",
  //     codice_vendita: "",
  //   },
  //   {
  //     nome: "Iphone 12 Pro",
  //     colore: "Bianco",
  //     capacità: 512,
  //     anno_di_uscita: 2020,
  //     stato: "In magazzino",
  //     condizione: "Eccellente",
  //     fotocamera: "Tripla",
  //     dimensioni_schermo: 6.1,
  //     prezzo_di_acquisto: 650,
  //     prezzo_di_vendita: -1,
  //     prezzo_consigliato: 750,
  //     codice_acquisto: "ACQ100",
  //     codice_vendita: "",
  //   },
  //   {
  //     nome: "Iphone 12 Mini",
  //     colore: "Viola",
  //     capacità: 64,
  //     anno_di_uscita: 2020,
  //     stato: "In magazzino",
  //     condizione: "Accettabile",
  //     fotocamera: "Doppia",
  //     dimensioni_schermo: 5.4,
  //     prezzo_di_acquisto: 150,
  //     prezzo_di_vendita: -1,
  //     prezzo_consigliato: 250,
  //     codice_acquisto: "ACQ100",
  //     codice_vendita: "",
  //   },
  //   {
  //     nome: "Iphone 12 Pro Max",
  //     colore: "Nero",
  //     capacità: 256,
  //     anno_di_uscita: 2020,
  //     stato: "In magazzino",
  //     condizione: "Ottimo",
  //     fotocamera: "Tripla",
  //     dimensioni_schermo: 6.7,
  //     prezzo_di_acquisto: 650,
  //     prezzo_di_vendita: -1,
  //     prezzo_consigliato: 750,
  //     codice_acquisto: "ACQ100",
  //     codice_vendita: "",
  //   },
  // ];
  //   const acquisto = {
  //     costo: 2000,
  //     quantità_articoli_acquistati: 4,
  //   };
  //   const fornitore = {
  //     nome: "Apple",
  //     email: "apple@gmail.com",
  //     telefono: "1234567890",
  //     indirizzo: "Via Roma 1",
  //     referente: "Mario Rossi",
  //     partita_iva: "1234567890",
  //     sito_web: "www.apple.com",
  //     iban: "IT60X0542811101000000123456",
  //   };
  //   useEffect(() => {
  //     async function insertData() {
  //     //  NON USARE addFornitore e addAcquisto, solo addProdotto per inseriri prodotti al database. Se vuoi farlo uncommenta una volta tutta la funzione e uncommenta le prime tre righe del file. const res2 = await axios.post(
  //     //     "http://localhost:8000/radioapp/addFornitore/",
  //     //     {
  //     //       nome: fornitore.nome,
  //     //       email: fornitore.email,
  //     //       telefono: fornitore.telefono,
  //     //       indirizzo: fornitore.indirizzo,
  //     //       referente: fornitore.referente,
  //     //       partita_iva: fornitore.partita_iva,
  //     //       sito_web: fornitore.sito_web,
  //     //       iban: fornitore.iban,
  //     //     }
  //     //   );
  //     //   console.log(res2);
  //     //   const res = await axios.post(
  //     //     "http://localhost:8000/radioapp/addAcquisto/",
  //     //     {
  //     //       costo: acquisto.costo,
  //     //       quantità_articoli_acquistati: acquisto.quantità_articoli_acquistati,
  //     //     }
  //     //   );
  //     //   console.log(res);
  //       prodotti.forEach((prodotto) => {
  //         axios
  //           .post("http://localhost:8000/radioapp/addProdotto/", {
  //             nome: prodotto.nome,
  //             colore: prodotto.colore,
  //             capacità: prodotto.capacità,
  //             anno_di_uscita: prodotto.anno_di_uscita,
  //             stato: prodotto.stato,
  //             condizione: prodotto.condizione,
  //             fotocamera: prodotto.fotocamera,
  //             dimensioni_schermo: prodotto.dimensioni_schermo,
  //             prezzo_di_acquisto: prodotto.prezzo_di_acquisto,
  //             prezzo_di_vendita: prodotto.prezzo_di_vendita,
  //             prezzo_consigliato: prodotto.prezzo_consigliato,
  //             codice_acquisto: prodotto.codice_acquisto,
  //             codice_vendita: prodotto.codice_vendita,
  //           })
  //           .then((response) => {
  //             console.log(response);
  //           });
  //       });
  //     }
  //     insertData();
  //   }, [prodotti, acquisto, fornitore]);

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
