import React from "react";
import WrestlerDashboard from "./WrestlerDashboard";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import classNames from "classnames";
import NavigationBar from "./NavigationBar";

export default function AllGradesAllLevels() {
  const [grades, setGrades] = React.useState([]);

  let UID = sessionStorage.getItem("UID");
  let token = sessionStorage.getItem("token");

  React.useEffect(() => {
    fetch(`/api/grades/allCurrentGradesForASingleWrestler/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setGrades(results);
      });
  }, []);

  return (
    <>
      <NavigationBar />

      <WrestlerDashboard />

      <table className="table table-striped">
        <thead className="sticky-top">
          <tr className="bg-light">
            <th>Level</th>
            <th>Name</th>
            <th>Link to detailed video explanation</th>
            <th>Link to looped video</th>
            <th>Your grade</th>
            <th>Notes</th>
            <th>Last graded</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((video) => {
            return (
              <tr key={`${video.id}`}>
                <td>{video.curriculum_level}</td>
                <td>{video.name_of_video}</td>
                <td>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.url_to_video}`}
                    target="_blank"
                  >
                    Detailed Video
                  </a>
                </td>
                <td>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.url_to_looped_video}`}
                    target="_blank"
                  >
                    Looped Video
                  </a>
                </td>

                <td
                  className={classNames({
                    gradeOf3: video.grade === 3,
                    gradeOf2: video.grade === 2,
                    gradeOf1: video.grade === 1,
                    gradeOfIncorrect: video.grade > 3 || video.grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  {video.grade}
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.grade === 3,
                    gradeOf2: video.grade === 2,
                    gradeOf1: video.grade === 1,
                    gradeOfIncorrect: video.grade > 3 || video.grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  {video.movement_notes}
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.grade === 3,
                    gradeOf2: video.grade === 2,
                    gradeOf1: video.grade === 1,
                    gradeOfIncorrect: video.grade > 3 || video.grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  <Moment fromNow>{video.created_at}</Moment>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
