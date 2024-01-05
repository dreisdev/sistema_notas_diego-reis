"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Avaliacao_1 = require("../@types/Avaliacao");
const notasSchema = new mongoose_1.Schema({
    bimestre: {
        type: String,
        enum: Object.values(Avaliacao_1.Bimestre),
        required: true,
    },
    disciplina: {
        type: String,
        enum: Object.values(Avaliacao_1.Disciplina),
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
}, { timestamps: true });
notasSchema.pre("save", function (next) {
    this.atualizadoEm = new Date();
    next();
});
const Notas = mongoose_1.default.model('Notas', notasSchema);
exports.default = Notas;
