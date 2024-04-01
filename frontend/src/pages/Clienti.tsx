import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";

interface Clienti {
    nome: string;
    email: string;
    telefono: string;
    indirizzo: string;
  }

export default function Clienti() {
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
    "nome",
    "email",
    "telefono",
    "indirizzo",
  ];
  const clienti: Clienti[] = [
    {
      nome: "Cliente 1",
      email: "cliente1@example.com",
      telefono: "123-456-7890",
      indirizzo: "Via Roma, 1, 00100 Roma RM"
    },
    {
      nome: "Cliente 2",
      email: "cliente2@example.com",
      telefono: "098-765-4321",
      indirizzo: "Via Milano, 2, 20100 Milano MI"
    },
    {
      nome: "Cliente 3",
      email: "cliente3@example.com",
      telefono: "111-222-3333",
      indirizzo: "Via Napoli, 3, 80100 Napoli NA"
    }
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
          <Table fields={fields} informations={clienti} />
        </div>
      </div>
    </div>
  );
}