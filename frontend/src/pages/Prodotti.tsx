import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Card from "../components/Card/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../interfaceHelper";
import { FilterProduct } from "../interfaceHelper";

export default function Prodotti() {
  const filters = [
    {
      title: "Stato",
      options: ["In arrivo", "In magazzino", "Venduto"],
    },
    {
      title: "Capacità",
      options: ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"],
    },
    {
      title: "Condizione",
      options: ["Accettabile", "Ottimo", "Eccellente"],
    },
    {
      title: "Fotocamera",
      options: ["Singola", "Doppia", "Tripla"],
    },
    {
      title: "Colore",
      options: [
        "Nero",
        "Bianco",
        "Blu",
        "Rosso",
        "Verde",
        "Giallo",
        "Viola",
        "Arancione",
        "Rosa",
        "Grigio",
      ],
    },
  ];
  const [products, setProducts] = useState<Product[]>([]);
  const [checkedOptions, setCheckedOptions] = useState<FilterProduct[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "http://localhost:8000/radioapp/getAggregatedProdotti"
      );
      setProducts(res.data);
    }
    async function filterData() {
      const res = await axios.post(
        "http://localhost:8000/radioapp/filterAggregatedProdotti/",
        { checkedOptions }
      );
      setProducts(res.data);
    }
    if (checkedOptions.length == 0) {
      fetchData();
    } else {
      filterData();
    }
  }, [checkedOptions]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row align-top mt-16">
        <div className="w-3/12 px-4 fixed">
          <h2 className="text-2xl font-semibold">Filtro</h2>
          <hr className="h-2 border-t-2" />
          {filters.map((filter) => (
            <div key={filter.title}>
              <Filter
                title={filter.title}
                options={filter.options}
                checkedOptions={checkedOptions}
                setCheckedOptions={setCheckedOptions}
              />
              <hr />
            </div>
          ))}
        </div>
        <div className="w-9/12 ml-[25%] px-4 grid grid-cols-2 gap-4">
          {products.map((product: Product) => (
            <Card
              key={product.nome}
              title={product.nome}
              capacità_possibili={product.capacità_possibili}
              colori_possibili={product.colori_possibili}
              quantità={product.quantità}
              prezzo={product.prezzo}
              checkedOptions={checkedOptions}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
