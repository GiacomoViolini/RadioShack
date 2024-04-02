import { useState } from "react";
import "../../pagestyles/Prodotti.css";
interface FilterProps {
  title: string;
  options: string[];
}

export default function Filter({ title, options }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
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
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <input type="checkbox" className="accent-white" />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
