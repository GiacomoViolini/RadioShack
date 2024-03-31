import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";

export default function Prodotti() {
  const filters = [
    {
      title: "Capacità",
      options: [64, 128, 256, 512, 1024],
    },
    {
      title: "Capacità",
      options: ["aaa", "bbb", "ccc"],
    },
  ];
  const fields = [
    "codice fornitore",
    "codice fornitore",
    "codice fornitore",
    "codice fornitore",
    "codice fornitore",
    "ciao"
  ];
  const informations = [
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
    ],
  ];
  const informations1 = [
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
    [
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "codice fornitore",
      "ciao",
    ],
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
          <Table fields={fields} informations={informations1} />
        </div>
      </div>
    </div>
  );
}
