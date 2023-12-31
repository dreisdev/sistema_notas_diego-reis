export enum Bimestre {
  PRIMEIRO = "PRIMEIRO",
  SEGUNDO = "SEGUNDO",
  TERCEIRO = "TERCEIRO",
  QUARTO = "QUARTO",
}

export enum Disciplina {
  BIOLOGIA = "Biologia",
  ARTES = "Artes",
  GEOGRAFIA = "Geografia",
  SOCIOLOGIA = "Sociologia",
}

export interface Avaliacao {
  bimestre: Bimestre;
  disciplina: Disciplina;
  nota: number;
  criadoEm: Date;
  atualizadoEm: Date;
  _id?: string;
}