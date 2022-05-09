import React from "react";
import { Link } from "react-router-dom";
import GradesOfX from "./GradesOfX";
import MoveSearch from "./MoveSearch";
import NotesFromCoachesForWrestlers from "./NotesFromCoachesForWrestlers";
import NavigationBar from "./NavigationBar";
import GradingDashboardMadeByLuke from "./GradingDashboardMadeByLuke";

function WrestlersView() {
  const [moves, setMoves] = React.useState([]);
  const [levels, setLevels] = React.useState([]);

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
      <NotesFromCoachesForWrestlers UID={UID} />
      <hr />
      <Link to={"/AllGradesAllLevels"}>
        <h3>Click here to view all of your grades on all levels</h3>
      </Link>
      <hr />
      <GradesOfX />
      

      <hr />
      <h3>Click on a level to view the moves, grades, and coaches' notes</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => {
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
        </tbody>
      </table>
      <hr />
      <MoveSearch />
      <hr />
    </>
  );
}

//delete this comment

export default WrestlersView;
