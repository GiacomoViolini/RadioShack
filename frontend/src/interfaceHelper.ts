export interface Fornitore {
  id: number;
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  referente: string;
  iban: string;
  quantità_articoli_acquistati?: number;
  capitale_investito?: number;
}
export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  quantità_articoli_acquistati: number;
  capitale_investito: number;
}

export interface Acquisto {
  id: number;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: string;
  stato: string;
  codice_fornitore: number;
}

export interface Vendita {
  id: number;
  costo: number;
  quantità_articoli_acquistati: number;
  data_acquisto: string;
  codice_cliente: number;
}

export interface Prodotto {
  id: number;
  nome: string;
  colore: string;
  capacità: number;
  anno_di_uscita: number;
  stato: string;
  condizione: string;
  fotocamera: string;
  dimensioni_schermo: number;
  prezzo_di_acquisto: number;
  prezzo_di_vendita: number;
  prezzo_consigliato: number;
  codice_acquisto: string;
  codice_vendita: string;
  quantità: number;
}

export interface Product {
  id: number;
  nome: string;
  capacità_possibili: number[];
  colori_possibili: string[];
  quantità: number;
  prezzo: number;
}

export interface FilterProduct {
  title: string;
  options: string[];
}

export interface ListElementProps {
  title: string;
}

export interface TableProps {
  fields: string[];
  informations: Cliente[] | Vendita[] | Acquisto[] | Fornitore[];
  setId?: React.Dispatch<React.SetStateAction<number>>;
  setFlag?: React.Dispatch<React.SetStateAction<boolean>>;
  setFlag2?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FilterProps {
  title: string;
  options: string[];
  checkedOptions: FilterProduct[];
  setCheckedOptions: (options: FilterProduct[]) => void;
}

export interface FilterProduct {
  title: string;
  options: string[];
}

export interface CardDetailsProps {
  title: string;
  capacità: number;
  colore: string;
  quantità: number;
  prezzo_consigliato: number;
  stato: string;
  condizione: string;
  fotocamera: string;
  dimensioni_schermo: number;
  prezzo_di_acquisto: number;
  prezzo_di_vendita: number;
  anno_di_uscita: number;
}
export interface CardOrderProps {
  title: string;
  capacità: number;
  colore: string;
  quantità: number;
  prezzo_consigliato: number;
  condizione: string;
  fotocamera: string;
  dimensioni_schermo: number;
  prezzo_di_acquisto: number;
  anno_di_uscita: number;
  handleDelete: (newData: Prodotto) => void;
}

export interface CardProps {
  title: string;
  capacità_possibili: number[];
  colori_possibili: string[];
  quantità: number;
  prezzo: number;
}

export interface CheckOutListProps {
  numberAcquisti: number;
  fornitore: Fornitore;
  prodotti: Prodotto[];
}

export interface InsertAcquistiProps {
  numberAcquisti: number;
}

export interface ConfirmationToastProps {
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  toastTitle: string;
  subtitle: string;
  fetchData: () => void;
}

export interface CustomChartsProps {
  XPairs: [string, number][]; //the string value is the one dysplayed in the x-axis and the number value linked to that field that will be showed
  YScale: [number, number];
  Label: string;
  Category: string;
}

export interface CustomCharts {
  XPairs: [string, number][];
  YScale: [number, number];
  Label: string;
  Category: string;
}

export interface FilterItems {
  title: string;
  options: string[];
}

export interface FilterPropsStatistiche {
  title: string;
  options: string[];
  setProdottiOption: React.Dispatch<React.SetStateAction<string>>;
  setFornitoriOption: React.Dispatch<React.SetStateAction<string>>;
  setClientiOption: React.Dispatch<React.SetStateAction<string>>;
}
