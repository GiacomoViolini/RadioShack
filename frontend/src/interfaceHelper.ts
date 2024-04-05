import { Chart } from "chart.js";

export interface Fornitori {
  id: number;
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  referente: string;
  partita_iva: string;
  sito_web: string;
  iban: string;
  quantità_articoli_acquistati: number;
  capitale_investito: number;
}
  export interface Clienti {
    id: number;
    nome: string;
    email: string;
    telefono: string;
    indirizzo: string;
  }
  
  export interface Acquisti {
    id: number;
    costo: number;
    quantità_articoli_acquistati: number;
    data_acquisto: string;
    codice_fornitore: number;
  }
  
  export interface Vendite {
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
    informations: Clienti[] | Vendite[] | Acquisti[] | Fornitori[];
    setInformations: React.Dispatch<React.SetStateAction<Clienti[] | Vendite[] | Acquisti[] | Fornitori[]>>;
    setFlag: React.Dispatch<React.SetStateAction<boolean>>,
    confirmation:boolean,
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

  export interface CheckOutListProps{
    numberAcquisti: number
    fornitore: Fornitori
    prodotti: Prodotto[]
  }

  export interface InsertAcquistiProps{
    numberAcquisti: number
  }

  export interface Fornitore {
    id: string;
    nome: string;
    email: string;
    telefono: string;
    indirizzo: string;
    referente: string;
    partita_iva: string;
    sito_web: string;
    iban: string;
}

export interface ConfirmationToastProps{
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
  toastTitle: string,
  subtitle: string
}

export interface CustomChartsProps {
  XPairs: [string, number][];//the string value is the one dysplayed in the x-axis and the number value linked to that field that will be showed
  YScale: [number, number];
  Label: string;
  Category: string
}

export interface CustomCharts {
  XPairs: [string, number][];
  YScale: [number, number];
  Label: string;
  Category: string
}

export interface FilterItems {
  title: string;
  options: string[];
}

export interface FilterPropsStatistiche {
  title: string;
  options: string[];
  setProdottiOption: React.Dispatch<React.SetStateAction<string>>
  setFornitoriOption: React.Dispatch<React.SetStateAction<string>>
  setClientiOption: React.Dispatch<React.SetStateAction<string>>
}