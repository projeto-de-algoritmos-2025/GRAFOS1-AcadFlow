export interface Discipline {
    codigo: string;
    nome: string;
    cargaHoraria: number;
    semestre: number;
    preRequisitos: string[];
  }
  
  export interface Course {
    id: string;
    name: string;
    disciplines: Discipline[];
  }