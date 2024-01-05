"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotas = exports.DeleteNotas = exports.GetAllNotas = exports.CreateNotas = void 0;
const notasModel_1 = __importDefault(require("../../models/notasModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const CreateNotas = async (req, res) => {
    const { bimestre, disciplina, nota } = req.body;
    try {
        if (!bimestre) {
            return res.status(400).json({ mensagem: 'Campos obrigatório para criar Disciplina e lançar Notas: bismestre' });
        }
        if (!disciplina) {
            return res.status(400).json({ mensagem: 'Campos obrigatório para criar Diciplina e lançar Notas: disciplina' });
        }
        if (!nota) {
            return res.status(400).json({ mensagem: 'Campos obrigatório para criar Disciplina e lancar Notas: nota ' });
        }
        if (nota < 0 || nota > 10) {
            return res.status(400).json({ mensagem: 'A nota deve ser entre 0 e 10' });
        }
        const existingNota = await notasModel_1.default.findOne({ bimestre, disciplina });
        if (existingNota) {
            return res.status(400).json({ mensagem: `Já existe uma nota registrada no bimestre para disciplina ${disciplina}` });
        }
        const createNota = {
            bimestre,
            disciplina,
            nota
        };
        const response = await notasModel_1.default.create(createNota);
        res.status(201).json({ response, mensagem: 'Nota lançada com sucesso' });
    }
    catch (error) {
        console.error(error);
        const errorMessage = error.errors || 'Error interno do servidor';
        const errorResponse = {
            mensagem: errorMessage,
        };
        res.status(400).json(errorResponse);
    }
};
exports.CreateNotas = CreateNotas;
const GetAllNotas = async (req, res) => {
    try {
        const notas = await notasModel_1.default.find();
        res.status(201).json(notas);
    }
    catch (error) {
        console.error(error);
        const errorMessage = error || 'Error interno do servidor';
        const errorResponse = {
            mensagem: errorMessage,
        };
        res.status(400).json(errorResponse);
    }
};
exports.GetAllNotas = GetAllNotas;
const DeleteNotas = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).json({ mensagem: 'Disciplina não encontrada' });
            return;
        }
        const deleteNotas = await notasModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ deleteNotas, mensagem: 'Disciplina excluída com sucesso!' });
    }
    catch (error) {
        console.error(error);
        const errorMessage = error || 'Error interno do servidor';
        const errorResponse = {
            mensagem: errorMessage,
        };
        res.status(400).json(errorResponse);
    }
};
exports.DeleteNotas = DeleteNotas;
const UpdateNotas = async (req, res) => {
    const { id } = req.params;
    const { disciplina, nota } = req.body;
    try {
        if (!nota) {
            return res.status(400).json({ mensagem: 'Por favor informe a nova nota para atualização.' });
        }
        if (nota < 0 || nota > 10) {
            return res.status(400).json({ mensagem: 'A nota deve ser entre 0 e 10' });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).json({ mensagem: 'Disciplina não encontrada' });
            return;
        }
        else {
            await notasModel_1.default.findByIdAndUpdate(id, { nota: nota });
        }
        res.status(200).json({ disciplina, nota, mensagem: `Nota atualizada com sucesso!` });
    }
    catch (error) {
        console.error(error);
        const errorMessage = error || 'Error interno do servidor';
        const errorResponse = {
            mensagem: errorMessage,
        };
        res.status(400).json(errorResponse);
    }
};
exports.UpdateNotas = UpdateNotas;
