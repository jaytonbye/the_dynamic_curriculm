import React from "react";
import NavigationBar from "./NavigationBar";
import CreateAccountForTennancyModel from "./CreateAccountForTennancyModel";

function Admin() {
  const [moveName, setMoveName] = React.useState("");
  const [moveUrl, setMoveUrl] = React.useState("");
  const [moveLoopedUrl, setMoveLoopedUrl] = React.useState("");
  const [curriculumLevel, setCurriculumLevel] = React.useState("");
  const [numberForOrdering, setNumberForOrdering] = React.useState("");
  const [moves, setMoves] = React.useState([]);
  const [maximum_grade, setMaximum_grade] = React.useState([]);

  const onMoveNameChange = (event: any) => {
    setMoveName(event.target.value);
  };
  const onMoveUrlChange = (event: any) => {
    setMoveUrl(event.target.value);
  };
  const onMoveLoopedUrlChange = (event: any) => {
    setMoveLoopedUrl(event.target.value);
  };
  const onCurriculumLevelChange = (event: any) => {
    setCurriculumLevel(event.target.value);
  };
  const onNumberForOrderingChange = (event: any) => {
    setNumberForOrdering(event.target.value);
  };
  const onMaximum_gradeChange = (event: any) => {
    setMaximum_grade(event.target.value);
  };

  const onSubmitMove = () => {
    let token = sessionStorage.getItem("token");
    let UID = Number(sessionStorage.getItem("UID"));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        name_of_video: moveName,
        url_to_video: moveUrl,
        url_to_looped_video: moveLoopedUrl,
        number_for_ordering: numberForOrdering,
        curriculum_level: curriculumLevel,
        maximum_grade: maximum_grade,
        UID: UID,
      }),
    };
    fetch("/api/videos", requestOptions).then((res) => {
      if (res.ok) {
        alert("Video added");
      } else {
        alert("it didn't work!");
      }
    });
  };

  const onEditMove = (id: number) => {
    let token = sessionStorage.getItem("token");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name_of_video: moveName,
        url_to_video: moveUrl,
        url_to_looped_video: moveLoopedUrl,
        number_for_ordering: numberForOrdering,
        curriculum_level: curriculumLevel,
        id: id,
        maximum_grade: maximum_grade,
        // Is there a way I can use type checking here?
      }),
    };
    fetch(`/api/videos/`, requestOptions).then((res) => {
      if (res.ok) {
        alert("Video updated!");
        window.location.reload();
      } else {
        alert("it didn't work!");
      }
    });
  };

  const onDeleteMove = (id: number) => {
    let token = sessionStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id, //check to see if this can just be id
      }),
    };
    fetch(`/api/videos/${id}`, requestOptions).then((res) => {
      if (res.ok) {
        alert("Video deleted");
        window.location.reload();
      } else {
        alert("it didn't work!");
      }
    });
  };

  //gets us all of the moves in all levels.
  React.useEffect(() => {
    let token = sessionStorage.getItem("token");
    let UID = Number(sessionStorage.getItem("UID"));
    fetch(`/api/videos/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setMoves(results);
      });
  }, []);

  return (
    <>
      <div className="sticky-top bg-light">
        <NavigationBar />
        <CreateAccountForTennancyModel />
        <h1>admin page where we will add videos</h1>
        <form>
          <label htmlFor="">Name of Move: </label>
          <input type="text" onChange={onMoveNameChange} />
          <br />
          <label htmlFor="">Url to corresponding youtube video: </label>
          <input type="text" onChange={onMoveUrlChange} />
          <br />
          <label htmlFor="">
            Url to looped version of corresponding youtube video:
          </label>
          <input type="text" onChange={onMoveLoopedUrlChange} />
          <br />
          <label htmlFor="">Number for ordering:</label>
          <input type="number" onChange={onNumberForOrderingChange} />
          <br />
          <label htmlFor="">Insert into curriculum level: </label>
          <input type="number" onChange={onCurriculumLevelChange} />
          <br />
          <label htmlFor="">Maximum Grade: </label>
          <input type="number" onChange={onMaximum_gradeChange} />
          <br />
          <button
            id="submitButton"
            className="btn btn-success"
            onClick={onSubmitMove}
          >
            Submit New Move
          </button>
        </form>
      </div>
      <h2>Complete Curriculum</h2>
      <h3>
        Because I'm a lazy hacker, use the above input fields if you want to
        make an update to one of the videos below
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th>Move Id</th>
            <th>Number for ordering</th>
            <th>Level</th>
            <th>Move name</th>
            <th>Url to video</th>
            <th>Url to looped video</th>
            <th>Points Available</th>
            <th>Submit Buttons</th>
            <th>Delete Buttons</th>
          </tr>
        </thead>
        <tbody>
          {moves.map((move) => {
            return (
              <tr>
                <td>{move.id}</td>
                <td>{move.number_for_ordering}</td>
                <td>{move.curriculum_level}</td>
                <td>{move.name_of_video}</td>
                <td>{move.url_to_video}</td>
                <td>{move.url_to_looped_video}</td>
                <td>{move.maximum_grade}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => onEditMove(move.id)}
                  >
                    Submit Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteMove(move.id)}
                  >
                    Delete!
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Admin;
