import { Request, Response } from "express";
import NotasModel from '../../models/notasModel';
import mongoose from "mongoose";
import { ErrorResponse } from "../../@types/ErrorsResponse";



const CreateNotas = async (req: Request, res: Response) => {

    const { bimestre, disciplina, nota } = req.body;

    try {

        if (!bimestre || !disciplina || !nota) {

            return res.status(400).json({ mensagem: 'Campos obrigatórios para criar Notas: bismestre, disciplina, nota ' });
        }

        if (nota < 0 || nota > 10) {

            return res.status(400).json({ mensagem: 'A nota deve ser entre 0 e 10' });
        }

        const existingNota = await NotasModel.findOne({ bimestre, disciplina })
        if (existingNota) {

            return res.status(400).json({ mensagem: `Já existe uma nota registrada no bimestre para disciplina ${disciplina}` })
        }
        const createNota = {
            bimestre,
            disciplina,
            nota
        };


        const response = await NotasModel.create(createNota);

        res.status(201).json({ response, mensagem: 'Nota lançada com sucesso' })

    } catch (error) {

        console.error(error);

        const errorMessage = (error as any).errors || 'Error interno do servidor'

        const errorResponse: ErrorResponse = {
            mensagem: errorMessage,
        };


        res.status(400).json(errorResponse);

    }
}

const GetAllNotas = async (req: Request, res: Response) => {



    try {

        const notas = await NotasModel.find();

        res.status(201).json(notas)

    } catch (error) {

        console.error(error);

        const errorMessage = (error as any) || 'Error interno do servidor'

        const errorResponse: ErrorResponse = {
            mensagem: errorMessage,
        };


        res.status(400).json(errorResponse);

    }
}

const DeleteNotas = async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ mensagem: 'Disciplina não encontrada' });
            return;
        }

        const deleteNotas = await NotasModel.findByIdAndDelete(id);

        res.status(200).json({ deleteNotas, mensagem: 'Disciplina excluída com sucesso!' })

    } catch (error) {

        console.error(error);

        const errorMessage = (error as any) || 'Error interno do servidor'

        const errorResponse: ErrorResponse = {
            mensagem: errorMessage,
        };


        res.status(400).json(errorResponse);

    }
}

const UpdateNotas = async (req: Request, res: Response) => {

    const { id } = req.params

    const { disciplina, nota } = req.body





    try {

        if (!nota) {

            return res.status(400).json({ mensagem: 'Por favor informe a nova nota para atualização.' });
        }

        if (nota < 0 || nota > 10) {

            return res.status(400).json({ mensagem: 'A nota deve ser entre 0 e 10' });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ mensagem: 'Disciplina não encontrada' });
            return;
        } else {
            await NotasModel.findByIdAndUpdate(id, { nota: nota });
        }



        res.status(200).json({ disciplina, nota, mensagem: `Nota atualizada com sucesso!` })

    } catch (error) {

        console.error(error);

        const errorMessage = (error as any) || 'Error interno do servidor'

        const errorResponse: ErrorResponse = {
            mensagem: errorMessage,
        };


        res.status(400).json(errorResponse);

    }
}

export {
    CreateNotas,
    GetAllNotas,
    DeleteNotas,
    UpdateNotas
}
