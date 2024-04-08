import { ChartSkelethonProps } from "../../interfaceHelper";
import { useState, useEffect } from "react";
import { AssignColorSkelethon } from "../../utils";

export default function ChartSkelethon({ category }: ChartSkelethonProps) {
  const [BackColor, setBackColor] = useState<string[]>([]);
  const [BorColor, setBorColor] = useState<string[]>([]);
  const aux: number[] = Array.from({ length: 10 }, (_, i) => i);

  const validHeights = [
    "h-24",
    "h-56",
    "h-40",
    "h-48",
    "h-56",
    "h-40",
    "h-48",
    "h-56",
    "h-32",
    "h-24",
  ];

  useEffect(() => {
    let auxTuple: [string[], string[]] = AssignColorSkelethon(category);
    setBackColor(auxTuple[0]);
    setBorColor(auxTuple[1]);
  }, [category]);

  return (
    <div
      role="status"
      className="w-full h-60 2xl:h-5/6 pb-1 pt-4 gap-4 animate-pulse flex flex-col justify-items-center"
    >
      <div className="w-full flex flex-row gap-4 items-center justify-center">
        <div
          className="h-2.5 w-8"
          style={{
            backgroundColor: BackColor[0],
            borderColor: BorColor[0],
          }}
        ></div>
        <div className="w-16 h-1.5 bg-white rounded-full"></div>
      </div>
      <div className="w-full grid grid-cols-10 gap-4 items-baseline px-8">
        {aux.map((index: number) => (
          <div
            key={index}
            className="h-full grid-cols-1 flex flex-col items-center gap-4"
          >
            <div
              className={`w-full ${validHeights[index]}`}
              style={{
                backgroundColor: BackColor[index],
                borderColor: BorColor[index],
              }}
            ></div>
            <div className="w-full bg-white h-1 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
