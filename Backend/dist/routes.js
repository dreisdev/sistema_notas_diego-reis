"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notasEndpoint_1 = require("./controllers/Notas/notasEndpoint");
const rotas = (0, express_1.default)();
rotas.use(express_1.default.json());
rotas.post('/notas', notasEndpoint_1.CreateNotas);
rotas.get('/notas', notasEndpoint_1.GetAllNotas);
rotas.put('/notas/:id', notasEndpoint_1.UpdateNotas);
rotas.delete('/notas/:id', notasEndpoint_1.DeleteNotas);
exports.default = rotas;
