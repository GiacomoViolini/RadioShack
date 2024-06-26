import { useNavigate } from "react-router-dom";
import { convertiColori } from "../../utils";
import axios from "axios";

interface Product {
  id: number;
  nome: string;
  capacità_possibili: number[];
  colori_possibili: string[];
  quantità: number;
  prezzo: number;
}

interface CardProps {
  title: string;
  capacità_possibili: number[];
  colori_possibili: string[];
  quantità: number;
  prezzo: number;
  checkedOptions: FilterProduct[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
interface FilterProduct {
  title: string;
  options: string[];
}

export default function Card({
  title,
  capacità_possibili,
  colori_possibili,
  quantità,
  prezzo,
  checkedOptions,
  setProducts,
}: CardProps) {
  const image = "/Prodotti.svg";
  const navigate = useNavigate();
  async function deleteProduct() {
    const res = axios.delete(
      `http://localhost:8000/radioapp/deleteProdotto/` + title + `/`
    );
    console.log(res);
    setProducts((prev) => prev.filter((product) => product.nome !== title));
  }
  return (
    <div
      className="grid grid-cols-4 border-2 border-gray-300 rounded-lg hover:border-black  hover:bg-zinc-900 transition-all duration-500"
      onClick={() =>
        navigate(`/prodotti/${title}`, {
          state: { checkedOptions: checkedOptions },
        })
      }
    >
      <img
        src={image}
        className="col-span-1 w-full h-full bg-gray-300 rounded-l-sm p-2"
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
        <div className="flex justify-between py-2">
          <h2 className="font-semibold text-xl mt-2">Da {prezzo}€</h2>
          <button
            className="py-1 px-1.5 rounded-lg bg-zinc-500 hover:bg-zinc-700 transition-all duration-200 flex justify-center items-center"
            onClick={(event) => {
              event.stopPropagation();
              deleteProduct();
            }}
          >
            <img src="/DeleteIcon.svg" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
