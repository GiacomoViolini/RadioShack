import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import InstertElementButton from "../components/InsertElementButton/InsertElementButton";

interface Acquisti {
  codice_acquisto: string;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: Date;
  codice_fornitore: string;
}

export default function Acquisti() {
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
    "codice acquisto",
    "costo",
    "quantità articoli acquistati",
    "data acquisto",
    "codice fornitore"
  ];
  const acquisti: Acquisti[] = [
    {
      codice_acquisto: "A001",
      costo: 100.5,
      quantità_articoli_acquistati: 2,
      data_acquisto: new Date("2022-01-01"),
      codice_fornitore: "F001"
    },
    {
      codice_acquisto: "A002",
      costo: 200.75,
      quantità_articoli_acquistati: 3,
      data_acquisto: new Date("2022-02-01"),
      codice_fornitore: "F002"
    },
    {
      codice_acquisto: "A003",
      costo: 150.25,
      quantità_articoli_acquistati: 1,
      data_acquisto: new Date("2022-03-01"),
      codice_fornitore: "F003"
    }
  ];

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row align-top relative mt-20">
      <div className="w-2/12 flex flex-col justify-center gap-6 fixed">
          <div className="w-full justify-center px-4">
            <InstertElementButton title={"acquisto"} />
          </div>
          <div className="px-4 overflow-y-auto">
            <h2 className="text-2xl font-semibold">Filtro</h2>
            <hr className="h-2 border-t-2" />
            {filters.map((filter) => (
              <div key={filter.title}>
                <Filter title={filter.title} options={filter.options} />
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="w-9/12 ml-[25%] flex justify-center px-8">
          <Table fields={fields} informations={acquisti} />
        </div>
      </div>
    </div>
  );
}
