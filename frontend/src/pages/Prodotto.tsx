// import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
// import axios from "axios";

export default function Prodotto() {
//   const prodotti = [
//     {
//       nome: "Iphone 12",
//       colore: "Rosso",
//       capacità: 64,
//       anno_di_uscita: 2020,
//       stato: "In magazzino",
//       condizione: "Eccellente",
//       fotocamera: "Doppia",
//       dimensioni_schermo: 6.1,
//       prezzo_di_acquisto: 350,
//       prezzo_di_vendita: -1,
//       prezzo_consigliato: 450,
//       codice_acquisto: "ACQ100",
//       codice_vendita: "",
//     },
//     {
//       nome: "Iphone 12 Pro",
//       colore: "Bianco",
//       capacità: 512,
//       anno_di_uscita: 2020,
//       stato: "In magazzino",
//       condizione: "Eccellente",
//       fotocamera: "Tripla",
//       dimensioni_schermo: 6.1,
//       prezzo_di_acquisto: 650,
//       prezzo_di_vendita: -1,
//       prezzo_consigliato: 750,
//       codice_acquisto: "ACQ100",
//       codice_vendita: "",
//     },
//     {
//       nome: "Iphone 12 Mini",
//       colore: "Viola",
//       capacità: 64,
//       anno_di_uscita: 2020,
//       stato: "In magazzino",
//       condizione: "Accettabile",
//       fotocamera: "Doppia",
//       dimensioni_schermo: 5.4,
//       prezzo_di_acquisto: 150,
//       prezzo_di_vendita: -1,
//       prezzo_consigliato: 250,
//       codice_acquisto: "ACQ100",
//       codice_vendita: "",
//     },
//     {
//       nome: "Iphone 12 Pro Max",
//       colore: "Nero",
//       capacità: 256,
//       anno_di_uscita: 2020,
//       stato: "In magazzino",
//       condizione: "Ottimo",
//       fotocamera: "Tripla",
//       dimensioni_schermo: 6.7,
//       prezzo_di_acquisto: 650,
//       prezzo_di_vendita: -1,
//       prezzo_consigliato: 750,
//       codice_acquisto: "ACQ100",
//       codice_vendita: "",
//     },
//   ];
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
      <div className="grid grid-cols-4 gap-x-10 mt-16">
        <div className="col-span-1 bg-emerald-500 rounded-xl border-gray-300 border-4">
          <div className="h-8 mt-4 bg-zinc-800 border-t-2 border-b-2 flex justify-center items-center">
            <h2 className="text-center text-xl font-semibold ">300€</h2>{" "}
          </div>
          <img
            src="/Prodotti.svg"
            className="w-full rounded-2xl pb-8 px-8 pt-4"
          />
        </div>
        <div className="col-span-3 flex flex-col">
          <div className="flex gap-8">
            <h2 className="text-lg border-2 rounded-xl py-2 px-3">
              Numero Prodotti per Modello: 10
            </h2>
            <h2 className="text-lg border-2 rounded-xl py-2 px-3">
              Numero Prodotti per Caratteristiche Scelte: 5
            </h2>
          </div>
          <h2 className="text-2xl font-bold mt-4">Nome Prodotto</h2>
        </div>
      </div>
    </div>
  );
}
