export interface Fornitori {
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