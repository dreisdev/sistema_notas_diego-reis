/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC, useState, useEffect } from "react";
import "./modal.css";
import { ModalProps } from "../../@types/ModalProps";
import { NotaData } from "../../@types/NotasDataProps";

import closeModal from "../../assets/close_modal.svg";
import api from "../../Api/fetchData";
import useToast from "../../Hooks/useToast";

const Modal: FC<ModalProps> = ({ isOpen, onClose, bimestre }) => {
  const [idToSubject, setIdToSubject] = useState<string | undefined>("");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [term, setTerm] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [updatedNote, setUpdatedNote] = useState<number | string>(0);

  const fetchData = async (): Promise<NotaData[] | undefined> => {
    try {
      const response = await api.get("/notas");

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getDisciplinaId = async (
    term: string,
    subject: string
  ): Promise<string | undefined> => {
    const result = await fetchData();
    const termData = (result || []).filter((item) => item.bimestre === term);

    const disciplinaData = termData.find((item) => item.disciplina === subject);

    return disciplinaData ? disciplinaData._id : undefined;
  };

  const obterIdDaDisciplina = async (): Promise<void> => {
    try {
      const disciplinaId = await getDisciplinaId(term, subject);

      setIdToSubject(() => disciplinaId || "");
    } catch (error) {
      console.error("Erro ao obter o ID da disciplina:", error);
    }
  };

  useEffect(() => {
    obterIdDaDisciplina();
  }, [term, subject]);

  if (!isOpen) {
    return null;
  }

  const handleClear = () => {
    setUpdatedNote(0);
    setSelectedAction(null);
    setTerm("");
    setSubject("");
  };

  const handleApiCall = async () => {
    switch (bimestre) {
      case "Bimestre 1":
        setTerm(() => {
          return "PRIMEIRO";
        });
        break;

      case "Bimestre 2":
        setTerm(() => {
          return "SEGUNDO";
        });
        break;

      case "Bimestre 3":
        setTerm(() => {
          return "TERCEIRO";
        });
        break;

      case "Bimestre 4":
        setTerm(() => {
          return "QUARTO";
        });
        break;

      default:
        break;
    }
  };

  const handleActions = async () => {
    try {
      if (selectedAction === "createDisciplina") {
        try {
          const createSubject = {
            bimestre: term,
            disciplina: subject,
            nota: updatedNote,
          };
          const response = api.post("/notas", createSubject);

          useToast((await response).data.mensagem);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error(error);

          if (error.response) {
            useToast(`Erro: ${error.response.data.mensagem}`, "error");
          } else if (error.request) {
            useToast("Erro: Sem resposta do servidor", "error");
          } else {
            // Algo aconteceu durante a configuração da requisição que gerou o erro
            useToast("Erro: Configuração da requisição falhou", "error");
          }
        }
      } else if (selectedAction === "updateNotas") {
        try {
          const updateSubject = {
            nota: updatedNote,
          };
          const response = api.put(`/notas/${idToSubject}`, updateSubject);

          useToast((await response).data.mensagem);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error(error);

          useToast(`Erro: ${error.response.data.mensagem}`, "error");
        }
      }
    } catch (error) {
      console.error("Erro na chamada à API:", error);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
      setUpdatedNote(parseFloat(inputValue));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.info("Ação Selecionada", selectedAction);
  };

  const handleSubject = (subjectToModal: string) => {
    useToast(`Disciplina ${subjectToModal} selecionada`);
    setSubject(() => {
      return subjectToModal;
    });

    handleApiCall();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h1>{bimestre}</h1>
          <button
            onClick={() => {
              onClose();
              handleClear();
            }}
            className="modal-close-button"
          >
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
              Criar Disciplina e Lançar Nota
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
          </div>

          <div className="modal-subjects">
            <div className="modal-subjects-title">
              <h1>Disciplina</h1>
            </div>

            <div className="modal-box-subjects">
              <button
                className="biologia"
                onClick={() => handleSubject("Biologia")}
              >
                Biologia
              </button>

              <button className="artes" onClick={() => handleSubject("Artes")}>
                Artes
              </button>

              <button
                className="geografia"
                onClick={() => handleSubject("Geografia")}
              >
                Geografia
              </button>

              <button
                className="sociologia"
                onClick={() => handleSubject("Sociologia")}
              >
                Sociologia
              </button>
            </div>
          </div>

          <div className="modal-note">
            <label htmlFor="note">Nota</label>
            <input
              id="note"
              type="number"
              step="0.1"
              value={updatedNote}
              onChange={handleNoteChange}
              required
            />
          </div>

          <div className="btn-confirm">
            <button onClick={handleActions}>Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
