import { ListElementProps } from "../../interfaceHelper";

export default function ListElementComponent({ title }: ListElementProps) {
    const isClienti = title === "clienti";
    const isVendite = title === "vendite";

    return (
        <div className="flex flex-row items-center justify-center gap-4 rounded-xl border-2 p-2 w-full border-slate-300 ">
            <h2 className="text-xl font-bold">{`Lista ${title}`}</h2>
            {isClienti && <img src="./Clienti.svg" className="h-8 mb-1" alt="Clienti Icon" />}
            {isVendite && <img src="./Vendite.svg" className="h-8" alt="Vendite Icon" />}
        </div>
    );
}