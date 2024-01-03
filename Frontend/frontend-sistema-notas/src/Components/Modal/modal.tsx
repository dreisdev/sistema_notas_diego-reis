import React, { FC, useState } from "react";
import "./modal.css";
import { ModalProps } from "../../@types/ModalProps";
import closeModal from "../../assets/close_modal.svg";

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  bimestre,
  disciplina,
  nota,
}) => {
  const [note, setNote] = useState<number | string>(0);

  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleApiCall = async () => {
    try {
      if (selectedAction === "createDisciplina") {
        console.log(`Lançando disciplina no ${bimestre}`);
      } else if (selectedAction === "updateNotas") {
        console.log(`Atualizando notas na disciplina ${disciplina}`);
      } else if (selectedAction === "lancaNotas") {
        console.log(`Lançando notas na disciplina ${disciplina}`);
      }
    } catch (error) {
      console.error("Erro na chamada à API:", error);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
      setNote(parseFloat(inputValue));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(nota);

    console.log("Ação Selecionada", selectedAction);

    handleApiCall();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h1>{bimestre}</h1>
          <button onClick={onClose} className="modal-close-button">
            <img src={closeModal} alt="close_modal" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-checkbox">
            <label>
              <input
                type="radio"
                name="action"
                value="createDisciplina"
                checked={selectedAction === "createDisciplina"}
                onChange={() => setSelectedAction("createDisciplina")}
              />
              Criar Disciplina
            </label>

            <label>
              <input
                type="radio"
                name="action"
                value="updateNotas"
                checked={selectedAction === "updateNotas"}
                onChange={() => setSelectedAction("updateNotas")}
              />
              Atualizar Nota
            </label>

            <label>
              <input
                type="radio"
                name="action"
                value="lancaNotas"
                checked={selectedAction === "lancaNotas"}
                onChange={() => setSelectedAction("lancaNotas")}
              />
              Lançar Nota
            </label>
          </div>

          <div className="modal-subjects">
            <div className="modal-subjects-title">
              <h1>Disciplina</h1>
            </div>

            <div className="modal-box-subjects">
              <button className="biologia">Biologia</button>

              <button className="artes">Artes</button>

              <button className="geografia">Geografia</button>

              <button className="sociologia">Sociologia</button>
            </div>
          </div>

          <div className="modal-note">
            <label htmlFor="note">Nota</label>
            <input
              id="note"
              type="number"
              step="0.1"
              value={note}
              onChange={handleNoteChange}
              required
            />
          </div>

          <div className="btn-confirm">
            <button type="submit">Confirmar</button>
          </div>
        </form>

        {disciplina !== undefined && <p>Disciplina: {disciplina}</p>}
      </div>
    </div>
  );
};

export default Modal;
