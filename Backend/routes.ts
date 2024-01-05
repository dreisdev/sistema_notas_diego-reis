import express from 'express';
import { CreateNotas, DeleteNotas, GetAllNotas, UpdateNotas } from './src/controllers/Notas/notasEndpoint';
const rotas = express();

rotas.use(express.json());

rotas.post('/notas', CreateNotas);
rotas.get('/notas', GetAllNotas);
rotas.put('/notas/:id', UpdateNotas);
rotas.delete('/notas/:id', DeleteNotas);

export default rotas;