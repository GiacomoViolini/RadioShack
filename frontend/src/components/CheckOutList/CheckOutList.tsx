import { CheckOutListProps } from "../../interfaceHelper";
import { Fornitori,Prodotto } from "../../interfaceHelper";

export default function CheckOutList({numberAcquisti,fornitore,prodotti}:CheckOutListProps) {
    return(
        <div className="bg-slate-100 rounded-lg w-full px-4">
            <h1>
                Acquisto 
            </h1>
        </div>
    );
}