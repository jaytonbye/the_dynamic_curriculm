import React from "react";
import { Link } from "react-router-dom";
import WrestlerDashboard from "./WrestlerDashboard";
import GradesOfX from "./GradesOfX";
import MoveSearch from "./MoveSearch";

function WrestlersView() {
  const [moves, setMoves] = React.useState([]);
  const [levels, setLevels] = React.useState([]);

  let token = sessionStorage.getItem("token");
  React.useEffect(() => {
    fetch("/api/videos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setMoves(results);
      });
    fetch("/api/videos/getlevels", {
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
      <GradesOfX />
      <hr />
      <Link to={"/AllGradesAllLevels"}>
        <h3>Click here to view all of your grades on all levels</h3>
      </Link>

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
      <hr />
      <MoveSearch />
      <hr />
      <h1 className="text text-center mb-5">
        <Link to={"/Tests"}>Click here to view the written tests page</Link>
      </h1>
    </>
  );
}

//delete this comment

export default WrestlersView;
