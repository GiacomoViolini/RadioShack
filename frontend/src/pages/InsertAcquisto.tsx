import { useEffect, useState } from "react";
import ContainerFornitore from "../components/InserisciAcquistoFornitore/ContainerFornitore/ContainerFornitore";
import Navbar from "../components/Navbar/Navbar";
import { Fornitori } from "../interfaceHelper";
import axios from "axios";

export default function InsertAcquisto() {
  const [fornitori, setFornitori] = useState<Fornitori[]>([]);
  const [selectedFornitore, setSelectedFornitore] = useState<Fornitori | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "http://localhost:8000/radioapp/getFornitori"
      );
      setFornitori(res.data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex mt-20">
        <div className="flex flex-col w-3/12 bg-red-500"></div>
        <div className="flex flex-col gap-10 w-9/12 p-4">
          <ContainerFornitore fornitori={fornitori} selectedFornitore={selectedFornitore} setSelectedFornitore={setSelectedFornitore} />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl text-center font-semibold">Prodotti</h2>
            <hr className="h-2 border-t-2 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
