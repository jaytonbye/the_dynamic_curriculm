import React from "react";
import { Link } from "react-router-dom";
import GradesOfX from "./GradesOfX";
import MoveSearch from "./MoveSearch";
import NotesFromCoachesForWrestlers from "./NotesFromCoachesForWrestlers";
import NavigationBar from "./NavigationBar";
import GradingDashboardMadeByLuke from "./GradingDashboardMadeByLuke";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

function WrestlersView() {
  const [moves, setMoves] = React.useState([]);
  const [levels, setLevels] = React.useState([]);
  const [notesFromCoachesDropDown, setNotesFromCoachesDropDown] = React.useState(false)
  const [gradesOfXDropDown, setGradesOfXDropDown] = React.useState(false)
  const [levelsDropDown, setLevelsDropDown] = React.useState(false)
  const [moveSearchDropDown, setMoveSearchDropDown] = React.useState(false)

  let token = localStorage.getItem("token");
  let UID = Number(localStorage.getItem("UID"));

  React.useEffect(() => {
    fetch(`/api/videos/blah/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setLevels(results);
      });
  }, []);

  return (
    <>
      <NavigationBar />
      <GradingDashboardMadeByLuke UID={UID} />
      <hr />
      <div className="ml-2">
        <a className="text-primary" style={{ cursor: "pointer" }} onClick={() => setNotesFromCoachesDropDown(!notesFromCoachesDropDown)}>
          <h3>Recent coaching notes {notesFromCoachesDropDown ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}</h3>
        </a>
        {notesFromCoachesDropDown && <NotesFromCoachesForWrestlers UID={UID} />}
        <hr />
        <a className="text-primary" style={{ cursor: "pointer" }} onClick={() => setGradesOfXDropDown(!gradesOfXDropDown)}>
          <h3>Moves By Grade {gradesOfXDropDown ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}</h3>
        </a>
        {gradesOfXDropDown && <GradesOfX />}
        <table className="table">
          <thead>
            <tr>
              <a className="text-primary" style={{ cursor: "pointer" }} onClick={() => setLevelsDropDown(!levelsDropDown)}>
                <th> <h3>Specific Levels Selection {levelsDropDown ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}</h3></th>
              </a>
            </tr>
          </thead>
          {levelsDropDown && <>
            <h3>Click on a level to view the moves, grades, and coaches' notes</h3>
            <tbody>
              {levels.map((level: any) => {
                return (
                  <tr key={level.curriculum_level}>
                    <td>
                      <Link to={`/level/${level.curriculum_level}`}>
                        Level {level.curriculum_level}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody></>}
        </table>
        <Link to={"/AllGradesAllLevels"}>
          <h3 className="text-dark" style={{ textDecoration: "underline" }}>Click here to be brought to all levels page</h3>
        </Link>
        <hr />
        <MoveSearch />
        <hr />
      </div>
    </>
  );
}

//delete this comment

export default WrestlersView;
