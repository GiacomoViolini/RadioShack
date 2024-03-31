import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  capacità_possibili: string[];
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
  function convertiColori(color: string) {
    switch (color) {
      case "Rosso":
        return "#ef4444";
      case "Blu":
        return "#3b82f6";
      case "Verde":
        return "#10b981";
      case "Giallo":
        return "#eab308";
      case "Viola":
        return "#a855f7";
      case "Arancione":
        return "#f97316";
      case "Rosa":
        return "pink-500";
      case "Grigio":
        return "gray-500";
      case "Bianco":
        return "white";
      case "Nero":
        return "black";
      default:
        return color;
    }
  }

  return (
    <button className="grid grid-cols-4 border-2 border-gray-300 rounded-lg hover:border-black  hover:bg-zinc-900 transition-all duration-500" onClick={() => navigate(`/prodotti/1`) }>
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
