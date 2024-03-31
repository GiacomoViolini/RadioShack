import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";

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
        <div className="col-span-4 bg-emerald-500">
          <h1>bbb</h1>
        </div>
      </div>
    </div>
  );
}
