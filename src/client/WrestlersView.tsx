import React from "react";
import Move from "./Move";
import SingleLevel from "./SingleLevel";
import { Link } from "react-router-dom";

function WrestlersView() {
  const [moves, setMoves] = React.useState([]);
  const [levels, setLevels] = React.useState([]);

  // this gets us all of the moves from the database and sets it to state.
  React.useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((results) => {
        setMoves(results);
      });
    fetch("http://localhost:3000/api/videos/getlevels")
      .then((res) => res.json())
      .then((results) => {
        setLevels(results);
      });
  }, []);

  return (
    <>
      <h1>Wrestler's view page</h1>
      <h1>Wrestler Dashboard</h1>
      <h2>Name of wrestler</h2>
      <h3>Total points</h3>
      <h3>
        List of Levels (with link)/ Points Earned / Total Points Available
      </h3>

      <table className="table">
        <thead>
          <tr>
            <th>Level</th>
            <th>Points Earned</th>
            <th>Total Points Available</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => {
            return (
              <tr>
                <Link to={`/level/${level.curriculum_level}`}>
                  <td>Level {level.curriculum_level}</td>
                </Link>
                {/* Will these be links to the levels? */}
                <td>
                  How do i get the wrestlers total points for this level here?
                </td>
                <td>{level.total_videos * 3}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1 className="primary">what an indidivual level will look like:</h1>
      <SingleLevel />
      <Move />
      <Move />
    </>
  );
}

export default WrestlersView;
