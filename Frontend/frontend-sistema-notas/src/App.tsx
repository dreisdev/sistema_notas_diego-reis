import "./App.css";

import red_chart from "./assets/red-Chart.png";
import trash from "./assets/Trash.png";

function App() {
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

  const disciplinaFetch = "Biologia";
  const disciplinaFetch2 = "Artes";
  const disciplinaFetch3 = "Geografia";
  const disciplinaFetch4 = "Sociologia";
  const dataLacamento = "31/12/2023";
  const nota = 9;
  return (
    <>
      <div className="container-app">
        <main className="terms">
          <section className="first-term">
            <div className="add">
              <h1 className="title-term">Bimestre 1</h1>

              <button className="btn-add">
                <span>+</span>
              </button>
            </div>
            <div className="box-subject">
              <div
                className={`card-subject ${getColorSubject(disciplinaFetch)}`}
              >
                <div className="card-subject-info">
                  <h1>{disciplinaFetch}</h1>
                  <h3>{dataLacamento}</h3>
                </div>

                <div className="chart">
                  <img src={red_chart} alt="grafico nota" />
                  <span className="note-spam"> Nota: {nota}</span>
                </div>
              </div>
              <div className="trash">
                <img src={trash} alt="toolip" />
              </div>
            </div>
            <div className="box-subject">
              <div
                className={`card-subject ${getColorSubject(disciplinaFetch2)}`}
              >
                <div className="card-subject-info">
                  <h1>{disciplinaFetch2}</h1>
                  <h3>{dataLacamento}</h3>
                </div>

                <div className="chart">
                  <img src={red_chart} alt="grafico nota" />
                  <span className="note-spam"> Nota: {nota}</span>
                </div>
              </div>
              <div className="trash">
                <img src={trash} alt="toolip" />
              </div>
            </div>
            <div className="box-subject">
              <div
                className={`card-subject ${getColorSubject(disciplinaFetch3)}`}
              >
                <div className="card-subject-info">
                  <h1>{disciplinaFetch3}</h1>
                  <h3>{dataLacamento}</h3>
                </div>

                <div className="chart">
                  <img src={red_chart} alt="grafico nota" />
                  <span className="note-spam"> Nota: {nota}</span>
                </div>
              </div>
              <div className="trash">
                <img src={trash} alt="toolip" />
              </div>
            </div>
            <div className="box-subject">
              <div
                className={`card-subject ${getColorSubject(disciplinaFetch4)}`}
              >
                <div className="card-subject-info">
                  <h1>{disciplinaFetch4}</h1>
                  <h3>{dataLacamento}</h3>
                </div>

                <div className="chart">
                  <img src={red_chart} alt="grafico nota" />
                  <span className="note-spam"> Nota: {nota}</span>
                </div>
              </div>
              <div className="trash">
                <img src={trash} alt="toolip" />
              </div>
            </div>
          </section>

          <section className="second-term">
            <h1 className="title-term">Bimestre 2</h1>
          </section>

          <section className="third-term">
            <h1 className="title-term">Bimestre 3</h1>
          </section>

          <section className="fourth-term">
            <h1 className="title-term">Bimestre 4</h1>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
