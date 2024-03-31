import Navbar from "../components/Navbar/Navbar";

export default function Prodotto() {
  const Prodotti = [
    {
      title: "Iphone 12",
      capacità: "64 GB",
      colore: "Rosso",
      quantità: 10,
      prezzo: 800,
      stato: "In arrivo",
      condizione: "Ottimo",
    },
    {
      title: "Iphone 12",
      capacità: "128 GB",
      colore: "Nero",
      quantità: 5,
      prezzo: 900,
      stato: "In negozio",
      condizione: "Eccellente",
    },
    {
      title: "Iphone 12",
      capacità: "64 GB",
      colore: "Rosso",
      quantità: 10,
      prezzo: 750,
      stato: "Venduto",
      condizione: "Accettabile",
    },
  ];
  let condizioni = new Set();
  let stati = new Set();
  let capacità = new Set();
  let colori = new Set();
  //Bisogna refactorare la page per prodotti per non grouppare i nomi dei modelli insiemi cosicchè questa possa displayare le informazioni di un singolo prodotto
  //senno bisogna prendere un oggetto selezionato da un array di oggetti, displayare le sue informazioni come base e cambiare oggetto in base alle informazioni selezionate
  return (
    <div className="flex flex-col" style={{ height: "50vh" }}>
      <Navbar />
      <div className="grid grid-cols-4 gap-x-10">
        <div className="col-span-1 bg-emerald-500 rounded-xl border-gray-300 border-4">
          <div className="h-8 mt-4 bg-zinc-800 border-t-2 border-b-2 flex justify-center items-center">
            {" "}
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
