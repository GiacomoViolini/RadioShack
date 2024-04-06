import { useState, useEffect } from "react";
import "../../pagestyles/Prodotti.css";
import { FilterPropsStatistiche } from "../../interfaceHelper";

export default function StatisticheFilter({
  title,
  options,
  setProdottiOption,
  setFornitoriOption,
  setClientiOption,
}: FilterPropsStatistiche) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedOption, setCheckedOption] = useState(options[0]);

  useEffect(() => {
    setCheckedOption(options[0]);
    handleCheck(options[0]);
  }, []);

  const handleCheck = (option: string) => {
    setCheckedOption(option);
    switch (title) {
      case "Top 10 dei Prodotti":
        setProdottiOption(option);
        break;
      case "Top 10 dei Fornitori":
        setFornitoriOption(option);
        break;
      case "Top 10 dei Clienti":
        setClientiOption(option);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-lg ">{title}</h2>
        <button className="p-1 rounded-full" onClick={() => setIsOpen(!isOpen)}>
          <img
            id="arrow"
            src={"/Down.svg"}
            className={`w-4 h-4 ${isOpen ? "rotate-up" : "rotate-down"}`}
          />
        </button>
      </div>
      <div className={`filter-content ${isOpen ? "open" : "closed"} mb-2`}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-white"
              onChange={() => handleCheck(option)}
              checked={option === checkedOption}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
