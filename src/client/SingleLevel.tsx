import React from "react";
import { useParams } from "react-router-dom";
import WrestlerDashboard from "./WrestlerDashboard";
import { IGradesForSingleWreslterOnSpecificLevel } from "../types/index";

//why am I not using typing here?

function SingleLevel() {
  const [movesAndGrades, setMovesAndGrades] = React.useState([]);
  let token = sessionStorage.getItem("token");
  let { level } = useParams<any>();
  let UID = sessionStorage.getItem("UID");

  //gets us all of the moves and grades for specific wrestler on specific level (currently user 3 level 1)
  React.useEffect(() => {
    fetch(
      `/api/grades/gradesForSingleWreslterOnSpecificLevel/${UID}&${level}`,
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
      <h1 className="text text-center mb-3">
        You are currently viewing level {level} of the Dynamic Wrestling
        Curriculum!
      </h1>

      <div>
        {movesAndGrades.map((move: IGradesForSingleWreslterOnSpecificLevel) => {
          if (move.curriculum_level === Number(level)) {
            return (
              <div className="everything">
                <h4 className="text text-center">
                  {move.number_for_ordering}. {move.name_of_video}
                </h4>
                <div className="d-flex justify-content-around flex-wrap">
                  <div>
                    <iframe
                      src={`https://www.youtube.com/embed/${move.url_to_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                  <div>
                    <iframe
                      src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                </div>
                <div>
                  <p>
                    <strong>Your grade here: </strong>
                    {move.grade}
                  </p>
                </div>
                <div>
                  <strong>Coaches Notes: </strong>
                  {move.movement_notes}
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default SingleLevel;
