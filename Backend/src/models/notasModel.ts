import mongoose, { Schema } from "mongoose";
import { NotasDocument } from "../@types/models";
import { Bimestre, Disciplina } from "../@types/Avaliacao";


const notasSchema = new Schema<NotasDocument>(
    {
        bimestre: {
            type: String,
            enum: Object.values(Bimestre),
            required: true,
        },
        disciplina: {
            type: String,
            enum: Object.values(Disciplina),
            required: true,
        },
        nota: {
            type: Number,
            required: true,
        },
        criadoEm: {
            type: Date,
            default: Date.now,
        },
        atualizadoEm: {
            type: Date,
            default: Date.now,
        },

    },

    { timestamps: true }


);

notasSchema.pre("save", function (next) {
    this.atualizadoEm = new Date();
    next();
})

const Notas = mongoose.model<NotasDocument>('Notas', notasSchema);

export default Notas;