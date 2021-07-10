import React from "react";
import { useParams } from "react-router-dom";
import WrestlerDashboard from "./WrestlerDashboard";
import { IGradesForSingleWreslterOnSpecificLevel } from "../types/index";

//why am I not using typing here?

function SingleLevel() {
  const [movesAndGrades, setMovesAndGrades] = React.useState([]);
  let token = sessionStorage.getItem("token");
  let { level } = useParams();
  let UID = sessionStorage.getItem("UID");

  //gets us all of the moves and grades for specific wrestler on specific level (currently user 3 level 1)
  React.useEffect(() => {
    fetch(
      `http://localhost:3000/api/grades/gradesForSingleWreslterOnSpecificLevel/${UID}&${level}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((results) => {
        setMovesAndGrades(results);
      });
  }, []);

  return (
    <>
      <WrestlerDashboard />
      <h1>
        You are currently viewing level {level} of the Dynamic Wrestling
        Curriculum!
      </h1>

      <table>
        <thead>
          <tr>
            <th>Move</th>
            <th>Video</th>
            <th>Looped Video</th>
            <th>Points earned</th>
            <th>Coaches' notes</th>
          </tr>
        </thead>
        <tbody>
          {movesAndGrades.map(
            (move: IGradesForSingleWreslterOnSpecificLevel) => {
              if (move.curriculum_level === Number(level)) {
                return (
                  <tr>
                    <td>
                      {move.number_for_ordering}. {move.name_of_video}
                    </td>
                    <td>
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${move.url_to_video}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </td>
                    <td>
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </td>
                    <td>
                      <p>
                        <strong>Your grade here:</strong> {move.grade}
                      </p>
                    </td>
                    <td>{move.movement_notes}</td>
                  </tr>
                );
              }
            }
          )}
        </tbody>
      </table>
    </>
  );
}

export default SingleLevel;
