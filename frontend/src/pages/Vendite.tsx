import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";

interface Vendite {
  codice_vendita: string;
  codice_cliente: string;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: Date;
}

export default function Vendite() {
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
  const fields = [
    "codice vendita",
    "codice cliente",
    "costo",
    "quantità articoli acquistati",
    "data acquisto",
  ];
  const vendite: Vendite[] = [
    {
      codice_vendita: "V001",
      codice_cliente: "123",
      costo: 100.5,
      quantità_articoli_acquistati: 2,
      data_acquisto: new Date("2022-01-01"),
    },
    {
      codice_vendita: "V002",
      codice_cliente: "456",
      costo: 200.75,
      quantità_articoli_acquistati: 3,
      data_acquisto: new Date("2022-02-01"),
    },
    {
      codice_vendita: "V003",
      codice_cliente: "789",
      costo: 150.25,
      quantità_articoli_acquistati: 1,
      data_acquisto: new Date("2022-03-01"),
    },
  ];
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="grid grid-cols-5">
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold">Filtro</h2>
          <hr className="h-2 border-t-2" />
          {filters.map((filter) => (
            <>
              <Filter title={filter.title} options={filter.options} />
              <hr />
            </>
          ))}
        </div>
        <div className="col-span-4 flex justify-center px-8">
          <Table fields={fields} informations={vendite} />
        </div>
      </div>
    </div>
  );
}