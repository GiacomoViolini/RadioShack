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
}: CardOrderProps) {
  const image = "/Prodotti.svg";
  return (
    <div className="grid grid-cols-5 border-2 border-gray-300 rounded-l">
      <img
        src={image}
        className="object-cover col-span-2 w-full h-full p-4 rounded-l-sm"
        style={{ backgroundColor: convertiColori(colore) }}
      />
      <div className="col-span-3 flex flex-col py-2 px-4 gap-2">
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
      </div>
    </div>
  );
}
