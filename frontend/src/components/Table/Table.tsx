import visualizeIcon from "../../../public/VisualizeIcon.svg";
import modifyIcon from "../../../public/ModifyIcon.svg";
import deleteIcon from "../../../public/DeleteIcon.svg";

interface TableProps {
  fields: string[];
  informations: string[][];
}

export default function Table({ fields, informations }: TableProps) {
  return (
    <table className="table-auto border-spacing-y-1 shadow-sm shadow-slate-300 border text-center border-slate-300 w-full rounded-md overflow-hidden">
      <thead className="bg-slate-100 text-black">
        <tr>
          {fields.map((field, index) => (
            <th key={index}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody className="border-spacing-y-1 border">
        {informations.map((information, rowIndex) => (
          <tr key={rowIndex} className="border-spacing-y-1 border ">
            {information.map((info, colIndex) =>
              information.length === colIndex + 1 && information.length > 5 ? (
                <td className="flex flex-row justify-center" key={colIndex}>
                  <img src={visualizeIcon} alt="visualize"></img>
                  <img src={modifyIcon} alt="modify"></img>
                  <img src={deleteIcon} alt="delete"></img>
                </td>
              ) : (
                <td key={colIndex}>{info}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
