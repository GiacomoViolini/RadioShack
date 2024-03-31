import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";

interface Fornitori {
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  referente: string;
  partita_iva: string;
  sito_web: string;
  iban: string;
}

export default function Fornitori() {
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
    "referente",
    "partita iva",
    "sito web",
    "iban"
  ];
  const fornitori: Fornitori[] = [
    {
      nome: "Fornitore 1",
      email: "fornitore1@example.com",
      telefono: "123-456-7890",
      indirizzo: "Via Roma, 1, 00100 Roma RM",
      referente: "Referente 1",
      partita_iva: "01234567890",
      sito_web: "www.fornitore1.com",
      iban: "IT60X0542811101000000123456"
    },
    {
      nome: "Fornitore 2",
      email: "fornitore2@example.com",
      telefono: "098-765-4321",
      indirizzo: "Via Milano, 2, 20100 Milano MI",
      referente: "Referente 2",
      partita_iva: "09876543210",
      sito_web: "www.fornitore2.com",
      iban: "IT60X0542811101000000654321"
    },
    {
      nome: "Fornitore 3",
      email: "fornitore3@example.com",
      telefono: "111-222-3333",
      indirizzo: "Via Napoli, 3, 80100 Napoli NA",
      referente: "Referente 3",
      partita_iva: "11122233344",
      sito_web: "www.fornitore3.com",
      iban: "IT60X0542811101000000111222"
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
          <Table fields={fields} informations={fornitori} />
        </div>
      </div>
    </div>
  );
}
