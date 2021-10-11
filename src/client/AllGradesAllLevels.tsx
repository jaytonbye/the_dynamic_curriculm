import React from "react";
import WrestlerDashboard from "./WrestlerDashboard";
import { Link } from "react-router-dom";
import Moment from "react-moment";

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
      <Link to={`/wrestlersview`}> Go back to homepage</Link>

      <WrestlerDashboard />

      <table className="table table-striped">
        <thead className="sticky-top">
          <tr className="bg-light">
            <th>Level</th>
            <th>Name</th>
            <th>Link to detailed video explanation</th>
            <th>Link to looped video</th>
            <th>Maximum grade</th>
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
                <td>{video.maximum_grade}</td>
                <td>{video.grade}</td>
                <td>{video.movement_notes}</td>
                <td>
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
