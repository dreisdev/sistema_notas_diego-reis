import { NotaData } from "./NotasDataProps";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    bimestre?: string;
    disciplina?: string;
    nota?: number;
    editingSubjectId?: NotaData[];
}