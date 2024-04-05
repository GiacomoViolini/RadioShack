import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { CustomCharts } from "../interfaceHelper";
import CustomLineChart from "../components/CustomChart/CustomLineChart";
import StatisticheFilter from "../components/Filter/StatisticheFilter";
import CustomChart from "../components/CustomChart/CustomChart";

export default function Statistiche() {
  const [ProdottiOption, setProdottiOption] = useState("");
  const [FornitoriOption, setFornitoriOption] = useState("");
  const [ClientiOption, setClientiOption] = useState("");
  const [Grafico1, setGrafico1] = useState<CustomCharts>();
  const [Grafico2, setGrafico2] = useState<CustomCharts>();
  const [Grafico3, setGrafico3] = useState<CustomCharts>();
  
  const filters = [
    {
      title: "Top 10 dei Prodotti",
      options: ["Più venduti", "Meno venduti", "Più remunerativi"],
    },
    {
      title: "Top 10 dei Fornitori",
      options: ["Più remunerativi", "Da cui effettuiamo più acquisti"],
    },
    {
      title: "Top 10 dei Clienti",
      options: ["Più remunerativi", "Che effetuano più ordini"],
    },
  ];

  useEffect(() => {
    const getPiuVenduti = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/radioapp/getPiuVenduti"
          );
          setGrafico1(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Failed to fetch fornitori:", error);
        }
      };
      const getMenoVenduti = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/radioapp/getMenoVenduti"
          );
          setGrafico1(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Failed to fetch fornitori:", error);
        }
      };
      const getPiuRemunerativi = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/radioapp/getPiuRemunerativi"
          );
          setGrafico1(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Failed to fetch fornitori:", error);
        }
      };
    switch (ProdottiOption) {
      case "Più venduti":
        getPiuVenduti
        break;
      case "Meno venduti":
        getMenoVenduti
        break;
      case "Più remunerativi":
        getPiuRemunerativi
        break;
    }
  }),[ProdottiOption];

  useEffect(() => {
    const getFornitoriPiuRemunerativi = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/radioapp/getFornitoriPiuRemunerativi"
          );
          setGrafico2(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Failed to fetch fornitori:", error);
        }
      };
      const getPiuOrdini = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/radioapp/getPiuOrdini"
          );
          setGrafico2(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Failed to fetch fornitori:", error);
        }
      };
    switch (FornitoriOption) {
      case "Più remunerativi":
        getFornitoriPiuRemunerativi
        break;
      case "Che effetuano più ordini":
        getPiuOrdini
        break;
    }
  }),[FornitoriOption];

  useEffect(() => {
    const getClientiPiuRemunerativi = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/radioapp/getClientiPiuRemunerativi"
          );
          setGrafico3(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Failed to fetch fornitori:", error);
        }
      };
      const getClientiPiuAcquisti = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/radioapp/getClientiPiuAcquisti"
          );
          setGrafico3(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Failed to fetch fornitori:", error);
        }
      };
    switch (ClientiOption) {
      case "Più remunerativi":
        getClientiPiuRemunerativi
        break;
      case "Da cui effettuiamo più acquisti":
        getClientiPiuAcquisti
        break;
    }
  }),[ClientiOption];

   const XPairs1 = [
     ["Product A", 10],
     ["Product B", 20],
     ["Product C", 30],
     ["Product A", 10],
     ["Product B", 20],
     ["Product C", 30],
     ["Product A", 10],
     ["Product B", 20],
     ["Product C", 30],
   ];
   const XPairs2 = [
     ["Supplier X", 40],
     ["Supplier Y", 50],
     ["Supplier Z", 60],
     ["Supplier X", 40],
     ["Supplier Y", 50],
     ["Supplier Z", 60],
     ["Supplier X", 40],
     ["Supplier Y", 50],
     ["Supplier Z", 60],
   ];
   const XPairs3 = [
     ["Customer 1", 70],
     ["Customer 2", 80],
     ["Customer 3", 90],
     ["Customer 1", 70],
     ["Customer 2", 80],
     ["Customer 3", 90],
     ["Customer 1", 70],
     ["Customer 2", 80],
     ["Customer 3", 90],
   ];
const XPairs4 = [
    ["12/07/2023", 70],
    ["13/07/2023", 30],
    ["14/07/2023", 90],
    ["12/07/2023", 70],
    ["13/07/2023", 30],
    ["14/07/2023", 90],
    ["12/07/2023", 70],
    ["13/07/2023", 30],
    ["14/07/2023", 90],
];

   const YScale: [number, number] = [0, 100];
   const Category = "Fornitori";
   const Category1 = "Prodotti";
   const Category2 = "Clienti";
   const Category3 = "Statistiche";
   const Label = "Sample Data";
   const Label1 = "Sample Data1";
   const Label2 = "Sample Data2";
   const Label3 = "Sample Data3";

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row align-top relative mt-20">
        <div className="w-3/12 flex flex-col justify-center gap-6 fixed">
          <div className="w-full justify-center px-4"></div>
          <div className="px-4 overflow-y-auto">
            <h2 className="text-2xl font-semibold">
              Seleziona Statistica da Visualizzare
            </h2>
            <hr className="h-2 border-t-2" />
            {filters.map((filter) => (
              <div key={filter.title}>
                <StatisticheFilter
                  title={filter.title}
                  options={filter.options}
                  setProdottiOption={setProdottiOption}
                  setFornitoriOption={setFornitoriOption}
                  setClientiOption={setClientiOption}
                />
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="w-9/12 ml-[25%] justify-center px-8 py-8 h-[90vh] grid grid-cols-2 fixe">
        <div className="bg-none rounded-xl flex flex-col justify-top items-center py-2 border-2 px-2 border-slate-100 mx-4 my-4">
            <h1 className=" text-3xl font-bold">Prodotti</h1>
            <CustomChart
                XPairs={XPairs1 as [string, number][]}
                YScale={YScale ?? [0, 100]}
                Label={Label ?? "Sample Data"}
                Category={Category1 ?? "Prodotti"}
            />
        </div>
        <div className="bg-none rounded-xl flex flex-col justify-top items-center py-2 border-2 px-2 border-slate-100 mx-4 my-4">
            <h1 className=" text-3xl font-bold">Fornitori</h1>
            <CustomChart
                XPairs={XPairs2 as [string, number][]}
                YScale={YScale ?? [0, 100]}
                Label={Label1 ?? "Sample Data"}
                Category={Category ?? "Fornitori"}
            />
        </div>
          <div className="bg-none rounded-xl flex flex-col justify-top items-center py-2 border-2 px-2 border-slate-100 mx-4 my-4">
            <h1 className=" text-3xl font-bold">Clienti</h1>
            <CustomChart
              XPairs={XPairs3 as [string, number][]}
              YScale={YScale ?? [0, 100]}
              Label={Label2 ?? "Sample Data"}
              Category={Category2 ?? "Fornitori"}
            />
          </div>
          <div className="bg-none rounded-xl flex flex-col justify-top border-2 border-slate-100 px-2 items-center py-2 mx-4 my-4">
            <h1 className=" text-3xl font-bold">Andamento Vendite</h1>
            <CustomLineChart
              XPairs={XPairs4 as [string, number][]}
              YScale={YScale}
              Label={Label3}
              Category={Category3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
