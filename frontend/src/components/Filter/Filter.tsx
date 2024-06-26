import { useState } from "react";
import "../../pagestyles/Prodotti.css";
import { FilterProps } from "../../interfaceHelper";

export default function Filter({
  title,
  options,
  checkedOptions,
  setCheckedOptions,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCheck = (option: string) => {
    const newOptions = checkedOptions.map((checkedOption) => {
      if (checkedOption.title === title) {
        if (checkedOption.options.includes(option)) {
          return {
            title,
            options: checkedOption.options.filter(
              (checkedOption) => checkedOption !== option
            ),
          };
        } else {
          return {
            title,
            options: [...checkedOption.options, option],
          };
        }
      } else {
        return checkedOption;
      }
    });
    if (!newOptions.some((option) => option.title === title)) {
      newOptions.push({ title, options: [option] });
    }
    if (newOptions.some((option) => option.options.length === 0)) {
      newOptions.splice(
        newOptions.findIndex((option) => option.options.length === 0),
        1
      );
    }
    setCheckedOptions(newOptions);
    console.log(newOptions);
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
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-white"
              onChange={() => handleCheck(option)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
