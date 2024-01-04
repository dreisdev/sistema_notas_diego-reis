/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import red_Chart from "./assets/red-Chart.png";
import yellow_Chart from "./assets/yellow-Chart.png";
import green_Chart from "./assets/green-Chart.png";
import trash from "./assets/Trash.png";

import Modal from "./Components/Modal/modal";
import api from "./Api/fetchData";
import { NotaData } from "./@types/NotasDataProps";

import { format } from "date-fns";
import useToast from "./Hooks/useToast";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [firstTerm, setFirstTerm] = useState<NotaData[]>([]);
  const [secondTerm, setSecondTerm] = useState<NotaData[]>([]);
  const [thirdTerm, setThirdTerm] = useState<NotaData[]>([]);
  const [fourthTerm, setFourthTerm] = useState<NotaData[]>([]);

  const [subjectModal, setSubjectModal] = useState<string>("");

  const openModal = async (term: string) => {
    setModalOpen(true);
    setSubjectModal(term);
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchDataFilters();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 500);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getColorSubject = (disciplina: string) => {
    switch (disciplina) {
      case "Biologia":
        return "subject-biologia";
      case "Artes":
        return "subject-artes";
      case "Geografia":
        return "subject-geografia";
      case "Sociologia":
        return "subject-sociologia";

      default:
        return "subject-default";
    }
  };

  const bimestre1 = "Bimestre 1";
  const bimestre2 = "Bimestre 2";
  const bimestre3 = "Bimestre 3";
  const bimestre4 = "Bimestre 4";

  const fetchData = async (): Promise<NotaData[] | undefined> => {
    try {
      const response = await api.get("/notas");

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataFilters = async () => {
    try {
      const result = await fetchData();

      const filterByTerm = (data: NotaData[], targetTerm: string) => {
        return data.filter((item) => item.bimestre === targetTerm);
      };

      const firstTermData = filterByTerm(result || [], "PRIMEIRO");
      setFirstTerm(firstTermData);

      const secondTermData = filterByTerm(result || [], "SEGUNDO");
      setSecondTerm(secondTermData);

      const thirdTermData = filterByTerm(result || [], "TERCEIRO");
      setThirdTerm(thirdTermData);

      const fourthTermData = filterByTerm(result || [], "QUARTO");
      setFourthTerm(fourthTermData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataFilters();
  }, []);

  const handleDelete = async (subjectId: string) => {
    try {
      const response = await api.delete(`/notas/${subjectId}`);

      useToast(response.data.mensagem);

      navigate(`/`);
      fetchDataFilters();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-app">
        <ToastContainer />
        <main className="terms">
          <section className="first-term">
            <div className="add">
              <h1 className="title-term">{bimestre1}</h1>

              <button className="btn-add" onClick={() => openModal(bimestre1)}>
                <span className="btn-plus">
                  {isWideScreen ? "Lançar Nota" : ""}{" "}
                  <span className="large-plus">+</span>
                </span>
              </button>
            </div>
            <aside className="main-box-subject">
              {firstTerm.map((item) => (
                <div className="box-subject" key={item._id}>
                  <div
                    className={`card-subject ${getColorSubject(
                      item.disciplina
                    )}`}
                  >
                    <div className="card-subject-info">
                      <h1>{item.disciplina}</h1>
                      <h3>{format(item.createdAt, "dd/MM/yyyy")}</h3>
                    </div>

                    <div className="chart">
                      <img
                        src={
                          item.nota < 6
                            ? red_Chart
                            : item.nota < 8
                            ? yellow_Chart
                            : green_Chart
                        }
                        alt="grafico nota"
                      />
                      <div className="note-span-div">
                        <span
                          className="note-spam"
                          style={{
                            color:
                              item.nota < 6
                                ? "#FF5964"
                                : item.nota < 8
                                ? "#FFFF99"
                                : "#05FF00",
                          }}
                        >
                          {" "}
                          {`Nota: ${item.nota}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="trash" onClick={() => handleDelete(item._id)}>
                    <img src={trash} alt="toolip" />
                  </div>
                </div>
              ))}
            </aside>
          </section>

          <section className="second-term">
            <div className="add">
              <h1 className="title-term">{bimestre2}</h1>

              <button className="btn-add" onClick={() => openModal(bimestre2)}>
                <span className="btn-plus">
                  {isWideScreen ? "Lançar Nota" : ""}{" "}
                  <span className="large-plus">+</span>
                </span>
              </button>
            </div>
            <aside className="main-box-subject">
              {secondTerm.map((item) => (
                <div className="box-subject" key={item._id}>
                  <div
                    className={`card-subject ${getColorSubject(
                      item.disciplina
                    )}`}
                  >
                    <div className="card-subject-info">
                      <h1>{item.disciplina}</h1>
                      <h3>{format(item.createdAt, "dd/MM/yyyy")}</h3>
                    </div>

                    <div className="chart">
                      <img
                        src={
                          item.nota < 6
                            ? red_Chart
                            : item.nota < 8
                            ? yellow_Chart
                            : green_Chart
                        }
                        alt="grafico nota"
                      />
                      <div className="note-span-div">
                        <span
                          className="note-spam"
                          style={{
                            color:
                              item.nota < 6
                                ? "#FF5964"
                                : item.nota < 8
                                ? "#FFFF99"
                                : "#05FF00",
                          }}
                        >
                          {" "}
                          {`Nota: ${item.nota}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="trash" onClick={() => handleDelete(item._id)}>
                    <img src={trash} alt="toolip" />
                  </div>
                </div>
              ))}
            </aside>
          </section>

          <section className="third-term">
            <div className="add">
              <h1 className="title-term">{bimestre3}</h1>

              <button className="btn-add" onClick={() => openModal(bimestre3)}>
                <span className="btn-plus">
                  {isWideScreen ? "Lançar Nota" : ""}{" "}
                  <span className="large-plus">+</span>
                </span>
              </button>
            </div>
            <aside className="main-box-subject">
              {thirdTerm.map((item) => (
                <div className="box-subject" key={item._id}>
                  <div
                    className={`card-subject ${getColorSubject(
                      item.disciplina
                    )}`}
                  >
                    <div className="card-subject-info">
                      <h1>{item.disciplina}</h1>
                      <h3>{format(item.createdAt, "dd/MM/yyyy")}</h3>
                    </div>

                    <div className="chart">
                      <img
                        src={
                          item.nota < 6
                            ? red_Chart
                            : item.nota < 8
                            ? yellow_Chart
                            : green_Chart
                        }
                        alt="grafico nota"
                      />
                      <div className="note-span-div">
                        <span
                          className="note-spam"
                          style={{
                            color:
                              item.nota < 6
                                ? "#FF5964"
                                : item.nota < 8
                                ? "#FFFF99"
                                : "#05FF00",
                          }}
                        >
                          {" "}
                          {`Nota: ${item.nota}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="trash" onClick={() => handleDelete(item._id)}>
                    <img src={trash} alt="toolip" />
                  </div>
                </div>
              ))}
            </aside>
          </section>

          <section className="fourth-term">
            <div className="add">
              <h1 className="title-term">{bimestre4}</h1>

              <button className="btn-add" onClick={() => openModal(bimestre4)}>
                <span className="btn-plus">
                  {isWideScreen ? "Lançar Nota" : ""}{" "}
                  <span className="large-plus">+</span>
                </span>
              </button>
            </div>
            <aside className="main-box-subject">
              {fourthTerm.map((item) => (
                <div className="box-subject" key={item._id}>
                  <div
                    className={`card-subject ${getColorSubject(
                      item.disciplina
                    )}`}
                  >
                    <div className="card-subject-info">
                      <h1>{item.disciplina}</h1>
                      <h3>{format(item.createdAt, "dd/MM/yyyy")}</h3>
                    </div>

                    <div className="chart">
                      <img
                        src={
                          item.nota < 6
                            ? red_Chart
                            : item.nota < 8
                            ? yellow_Chart
                            : green_Chart
                        }
                        alt="grafico nota"
                      />
                      <div className="note-span-div">
                        <span
                          className="note-spam"
                          style={{
                            color:
                              item.nota < 6
                                ? "#FF5964"
                                : item.nota < 8
                                ? "#FFFF99"
                                : "#05FF00",
                          }}
                        >
                          {" "}
                          {`Nota: ${item.nota}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="trash" onClick={() => handleDelete(item._id)}>
                    <img src={trash} alt="toolip" />
                  </div>
                </div>
              ))}
            </aside>
          </section>
          <div className="modal-terms">
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              bimestre={subjectModal}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
