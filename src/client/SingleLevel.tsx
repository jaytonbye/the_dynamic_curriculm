import React from "react";
import { useParams, Link } from "react-router-dom";
import { IGradesForSingleWreslterOnSpecificLevel } from "../types/index";
import classNames from "classnames";
import GradingDashboardMadeByLuke from "./GradingDashboardMadeByLuke";

//why am I not using typing here?

function SingleLevel() {
  const [movesAndGrades, setMovesAndGrades] = React.useState([]);
  let token = localStorage.getItem("token");
  let { level } = useParams<any>();
  let UID = localStorage.getItem("UID");

  //gets us all of the moves and grades for specific wrestler on specific level (currently user 3 level 1)
  React.useEffect(() => {
    fetch(
      `/api/grades/gradesForSingleWreslterOnSpecificLevel/${UID}/${level}`,
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
      <Link to={`/wrestlersview`}> Go back to homepage</Link>
      <GradingDashboardMadeByLuke UID={Number(UID)} />
      <h1 className="text text-center mb-3">
        You are currently viewing level {level} of the Dynamic Wrestling
        Curriculum!
      </h1>

      <div>
        {movesAndGrades.map((move: IGradesForSingleWreslterOnSpecificLevel) => {
          if (move.curriculum_level === Number(level)) {
            return (
              <div
                className={`${classNames({
                  gradeOf3: move.grade === 3,
                  gradeOf2: move.grade === 2,
                  gradeOf1: move.grade === 1,
                  gradeOfIncorrect: move.grade > 3 || move.grade < 0,
                  notGradeable: move.grade === 0,
                })} everything`}
              >
                <h4 className="text text-center">
                  {move.number_for_ordering}. {move.name_of_video}
                </h4>
                <div className="d-flex justify-content-around flex-wrap">
                  <div>
                    <iframe
                      src={`https://www.youtube.com/embed/${move.url_to_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div>
                    <iframe
                      src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div>
                  <p>
                    <strong>Your grade here: </strong>
                    {move.grade === 3 ? "★★★" : move.grade === 2 ? "★★" : move.grade === 1 ? "★" : move.grade === 0 ? "0" : "Not Graded"}
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
        <h2 className="text text-center mb-5">
          <strong>
            <Link to={"/Tests"}>
              <div className="btn btn-primary btn-lg">
                Click here to view the written tests for all levels.
              </div>
            </Link>
          </strong>
        </h2>
      </div>
    </>
  );
}

export default SingleLevel;
