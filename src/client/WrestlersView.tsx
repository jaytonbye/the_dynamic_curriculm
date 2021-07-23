import React from "react";
import { Link } from "react-router-dom";
import WrestlerDashboard from "./WrestlerDashboard";
import GradesOfX from "./GradesOfX";
import MoveSearch from "./MoveSearch";

function WrestlersView() {
  const [moves, setMoves] = React.useState([]);
  const [levels, setLevels] = React.useState([]);

  // this gets us all of the moves from the database and sets it to state. :)
  let token = sessionStorage.getItem("token");
  React.useEffect(() => {
    fetch("http://localhost:3000/api/videos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setMoves(results);
      });
    fetch("http://localhost:3000/api/videos/getlevels", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setLevels(results);
      });
  }, []);

  return (
    <>
      <WrestlerDashboard />
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
              <tr key={level.id}>
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
      <MoveSearch />
      <GradesOfX />
    </>
  );
}

export default WrestlersView;
