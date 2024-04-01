import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Card from "../components/Card/Card";

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
  const products = [
    {
      title: "Iphone 12",
      image: "../public/Prodotti.svg",
      capacità_possibili: ["64 GB", "128 GB", "256 GB"],
      colori_possibili: ["Rosso", "Blu", "Verde", "Giallo", "Viola"],
      quantità: 10,
      prezzo: 800,
    },
    {
      title: "Iphone 12 Pro",
      image: "../public/Prodotti.svg",
      capacità_possibili: ["128 GB", "256 GB", "512 GB"],
      colori_possibili: ["Rosso", "Blu", "Verde", "Giallo", "Viola"],
      quantità: 5,
      prezzo: 1000,
    },
    {
      title: "Iphone 12 Pro Max",
      image: "../public/Prodotti.svg",
      capacità_possibili: ["128 GB", "256 GB", "512 GB"],
      colori_possibili: ["Rosso", "Blu", "Verde", "Giallo", "Viola"],
      quantità: 3,
      prezzo: 1100,
    },
    {
      title: "Iphone 12 Mini",
      image: "../public/Prodotti.svg",
      capacità_possibili: ["64 GB", "128 GB", "256 GB"],
      colori_possibili: ["Rosso", "Blu", "Verde", "Giallo", "Viola"],
      quantità: 7,
      prezzo: 700,
    },
    {
      title: "Iphone 11",
      image: "../public/Prodotti.svg",
      capacità_possibili: ["64 GB", "128 GB", "256 GB"],
      colori_possibili: ["Rosso", "Blu", "Verde", "Giallo", "Viola"],
      quantità: 15,
      prezzo: 600,
    },
    {
      title: "Iphone 11 Pro",
      image: "../public/Prodotti.svg",
      capacità_possibili: ["128 GB", "256 GB", "512 GB"],
      colori_possibili: ["Rosso", "Blu", "Verde", "Giallo", "Viola"],
      quantità: 8,
      prezzo: 800,
    },
    {
      title: "Iphone 11 Pro Max",
      image: "../public/Prodotti.svg",
      capacità_possibili: ["128 GB", "256 GB", "512 GB"],
      colori_possibili: ["Rosso", "Blu", "Verde", "Giallo", "Viola"],
      quantità: 4,
      prezzo: 900,
    },
    {
      title: "Iphone SE",
      image: "../public/Prodotti.svg",
      capacità_possibili: ["64 GB", "128 GB", "256 GB"],
      colori_possibili: ["Rosso", "Blu", "Verde", "Giallo", "Viola"],
      quantità: 20,
      prezzo: 400,
    },
  ];
  return (
    <div className="flex flex-col">
      <Navbar/>
      <div className="flex flex-row align-top relative mt-20">
        <div className="w-3/12 px-4 fixed">
          <h2 className="text-2xl font-semibold">Filtro</h2>
          <hr className="h-2 border-t-2" />
          {filters.map((filter) => (
            <div key={filter.title}>
              <Filter title={filter.title} options={filter.options} />
              <hr />
            </div>
          ))}
        </div>
        <div className="w-9/12 h-screen ml-[25%] px-4">
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Card
                key={product.title}
                title={product.title}
                image={product.image}
                capacità_possibili={product.capacità_possibili}
                colori_possibili={product.colori_possibili}
                quantità={product.quantità}
                prezzo={product.prezzo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
