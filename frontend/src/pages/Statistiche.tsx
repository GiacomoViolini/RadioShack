import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { Chart } from "chart.js";
import CustomChart from "../components/CustomChart/CustomChart"

export default function Statistiche() {
  const chartRef1 = useRef<Chart | null>(null);
  const chartRef2 = useRef<Chart | null>(null);
  const chartRef3 = useRef<Chart | null>(null);
  const ChartRef4 = useRef<Chart | null>(null);

  const XPairs1 = [["Product A", 10], ["Product B", 20], ["Product C", 30]];
  const XPairs2 = [["Supplier X", 40], ["Supplier Y", 50], ["Supplier Z", 60]];
  const XPairs3 = [["Customer 1", 70], ["Customer 2", 80], ["Customer 3", 90]];

  const YScale :[number,number]= [0, 100];
  const Category = "Fornitori";
  const Category1 = "Prodotti";
  const Category2 = "Clienti";
  const Label = "Sample Data";
  const Label1 = "Sample Data1";
  const Label2 = "Sample Data2";

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
          </div>
        </div>
        <div className="w-9/12 ml-[25%] justify-center px-8 py-8 h-[90vh] grid grid-cols-2 fixe">
        <div className="bg-none rounded-xl flex flex-col justify-top items-center pt-2 mx-4 my-4">
            <h1 className=" text-3xl font-bold">Prodotti</h1>
            <CustomChart XPairs={XPairs1 as [string, number][]} YScale={YScale} Label={Label} chartRef={chartRef1} Category={Category}/>
        </div>
          <div className="bg-none rounded-xl flex flex-col justify-top items-center pt-2 mx-4 my-4">
            <h1 className=" text-3xl font-bold">Fornitori</h1>
            <CustomChart XPairs={XPairs2 as [string, number][]} YScale={YScale} Label={Label1} chartRef={chartRef2} Category={Category1}/>
          </div>
          <div className="bg-none rounded-xl flex flex-col justify-top items-center pt-2 mx-4 my-4">
            <h1 className=" text-3xl font-bold">Clienti</h1>
            <CustomChart XPairs={XPairs3 as [string, number][]} YScale={YScale} Label={Label2} chartRef={chartRef3} Category={Category2}/>
          </div>
          <div className="bg-none rounded-xl flex flex-col justify-top items-center pt-2 mx-4 my-4">
            <h1 className=" text-3xl font-bold">Andamento Vendite</h1>
          </div>
        </div>
      </div>
    </div>
  );
}