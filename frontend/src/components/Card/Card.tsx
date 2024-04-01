import { useNavigate } from "react-router-dom";
import { convertiColori } from "../../utils";

interface CardProps {
  title: string;
  capacità_possibili: number[];
  colori_possibili: string[];
  quantità: number;
  prezzo: number;
}

export default function Card({
  title,
  capacità_possibili,
  colori_possibili,
  quantità,
  prezzo,
}: CardProps) {
  const image = "/Prodotti.svg";
  const navigate = useNavigate();
  return (
    <button className="grid grid-cols-4 border-2 border-gray-300 rounded-lg hover:border-black  hover:bg-zinc-900 transition-all duration-500" onClick={() => navigate(`/prodotti/${title}`) }>
      <img
        src={image}
        className="object-cover w-full p-2 bg-gray-300 rounded-l-lg"
      />
      <div className="col-span-3 flex flex-col px-4 gap-4">
        <h2 className="border-2 rounded-lg text-center mt-2">
          N° Prodotti rimasti: {quantità}
        </h2>
        <h2 className="font-bold text-xl mt-2">{title}</h2>
        <div className="flex items-center gap-2">
          <>
            {capacità_possibili.map((capacità) => (
              <h2 key={capacità} className="border-2 rounded-lg px-2">
                {capacità}
              </h2>
            ))}
          </>
        </div>
        <div className="flex items-center gap-3">
          {colori_possibili.map((colore) => (
            <div
              key={colore}
              className={`rounded-full p-2`}
              style={{ backgroundColor: convertiColori(colore) }}
            />
          ))}
        </div>
        <h2 className="font-semibold text-xl mt-2">Da {prezzo}€</h2>
      </div>
    </button>
  );
}
