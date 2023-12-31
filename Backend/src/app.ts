
import express, { Request, Response, NextFunction } from 'express';

import rotas from './routes';

import database from './database/connection';



const PORT = process.env.PORT || 8000;

const app = express();


app.use(async (req, res, next) => {
    try {

        await database();
        next();

    } catch (error) {


        res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
});



app.use(express.json());
app.use(rotas);



app.listen(PORT, () => {
    console.log(`Server  on port ${PORT}`);



});


