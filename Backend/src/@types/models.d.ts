import { Document } from "mongoose";
import { Bimestre, Disciplina } from "./Avaliacao";

export interface NotasDocument extends Document {
    bimestre: Bimestre;
    disciplina: Disciplina;
    nota: number;
    criadoEm: Date;
    atualizadoEm: Date;
}