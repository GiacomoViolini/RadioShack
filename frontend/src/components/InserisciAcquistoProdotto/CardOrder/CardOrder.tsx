import { CardOrderProps } from "../../../interfaceHelper";
import { convertiColori, convertiCapacità } from "../../../utils";

export default function CardOrder({
  title,
  capacità,
  colore,
  quantità,
  prezzo_consigliato,
  condizione,
  fotocamera,
  dimensioni_schermo,
  prezzo_di_acquisto,
  anno_di_uscita,
  handleDelete,
}: CardOrderProps) {
  const image = "/Prodotti.svg";
  const nome = title;
  return (
    <div className="grid grid-cols-5 border-2 border-gray-300 rounded-l">
      <img
        src={image}
        className="object-cover col-span-2 w-full h-full p-4 rounded-l-sm"
        style={{ backgroundColor: convertiColori(colore) }}
      />
      <div className="col-span-3 flex flex-col py-2 px-4 gap-2 relative">
        <h2 className="border-2 rounded-lg text-center">
          N° Prodotti scelti: {quantità}
        </h2>
        <h2 className="font-bold text-xl">{title}</h2>
        <div className="flex flex-col">
          <h2 className="font-semibold">Condizione: {condizione}</h2>
          <h2 key={capacità} className="">
            Capacità: {convertiCapacità(capacità)}
          </h2>
          <h2 className="">Fotocamera: {fotocamera}</h2>
          <h2 className="">Dimensioni Schermo: {dimensioni_schermo}</h2>
          <h2 className="">Anno di Uscita: {anno_di_uscita}</h2>
          <h2 className="">Prezzo di Acquisto: {prezzo_di_acquisto}€</h2>
          <h2 className="">Prezzo Consigliato: {prezzo_consigliato}€</h2>
        </div>
        <button
          className="absolute top-[85%] left-[85%] py-1 px-1.5 w-8 rounded-lg bg-zinc-500 hover:bg-zinc-700 transition-all duration-200 flex justify-center items-center"
          onClick={() => {
            handleDelete({
              nome, capacità, colore, quantità, prezzo_consigliato, condizione, fotocamera, dimensioni_schermo, prezzo_di_acquisto, anno_di_uscita,
              id: 0,
              stato: "",
              prezzo_di_vendita: 0,
              codice_acquisto: "",
              codice_vendita: ""
            })
          }}
        >
          <img src="/DeleteIcon.svg" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
