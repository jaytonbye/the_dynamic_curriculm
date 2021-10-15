import React from "react";
import Moment from "react-moment";

function GradesOfXFor2Wrestlers(props: any) {
  const [movesAndGrades, setMovesAndGrades] = React.useState([]);
  const [wrestler1NewGrade, setWrestler1NewGrade] = React.useState();
  const [wrestler2NewGrade, setWrestler2NewGrade] = React.useState();
  const [wrestler1NewNote, setWrestler1NewNote] = React.useState();
  const [wrestler2NewNote, setWrestler2NewNote] = React.useState();

  let token = sessionStorage.getItem("token");

  const onGradeChange = (event: any) => {
    let grade = event.target.value;
    fetch(
      //wrong url
      `/api/grades/allSpecificCurrentGradesForTwoWrestlers/${props.wrestler1Id}&${props.wrestler2Id}&${grade}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((results) => {
        setMovesAndGrades(results);
      });
  };

  const onWrestler1GradeChange = (event: any) => {
    setWrestler1NewGrade(event.target.value);
  };
  const onWrestler1NoteChange = (event: any) => {
    setWrestler1NewNote(event.target.value);
  };
  const onWrestler2GradeChange = (event: any) => {
    setWrestler2NewGrade(event.target.value);
  };
  const onWrestler2NoteChange = (event: any) => {
    setWrestler2NewNote(event.target.value);
  };

  let submitGrade = (
    video_id: number,
    user_id: number,
    grade: number,
    note: string,
    max_grade: number
  ) => {
    if (grade > max_grade) {
      console.log("whoops");
      alert(
        "GRADE NOT SUBMITTED! You cannot submit a grade higher than the maximum grade"
      );
    } else if (grade < 0) {
      alert(
        "GRADE NOT SUBMITTED! You cannot submit a grade of a negative number"
      );
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          video_id: video_id,
          coach_user_id: 10, //until we have logins
          student_user_id: user_id,
          grade: grade,
          movement_notes: note,
        }),
      };
      fetch(`/api/grades/`, requestOptions).then((res) => {
        if (res.ok) {
          alert(
            `A grade of ${grade} was entered for wrestler with user ID: ${user_id}`
          );
          props.incrementUselessStateFunction();
        } else {
          alert("it didn't work!");
        }
      });
    }
  };

  return (
    <>
      <label className="h4">
        Show me all of the moves where 1 of the wrestlers has a grade of:{" "}
      </label>
      <input
        type="number"
        onChange={onGradeChange}
        placeholder="insert number"
      />
      <div className="divForLevel">
        {movesAndGrades.map((move) => {
          return (
            <>
              <div key={move.id}>
                <div className="" style={{ width: "100vw" }}>
                  <h3 className="text text-center">
                    {move.number_for_ordering}. {move.name_of_video}
                  </h3>
                </div>
                <div className="d-flex justify-content-center flex-wrap">
                  <div className="">
                    <h6 className="text text-center">Detailed Explanation</h6>
                    <iframe
                      width="95%"
                      src={`https://www.youtube.com/embed/${move.url_to_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                    ></iframe>
                  </div>
                  <div className="">
                    <h6 className="text text-center">Looped Video</h6>
                    <iframe
                      width="95%"
                      src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    ></iframe>
                  </div>
                </div>

                <div className="d-flex justify-content-center flex-wrap">
                  <div
                    className="my-1 p-2"
                    style={{ border: "solid black 1px" }}
                  >
                    <h6 className="text text-center">
                      {move.wrestler_1_first_name} {move.wrestler_1_last_name}
                    </h6>
                    <p>Current grade: {move.wrestler_1_grade}</p>
                    <p>Current notes: {move.wrestler_1_movement_notes}</p>
                    <p>
                      Last graded:{" "}
                      <Moment fromNow>
                        {move.wrestler_1_grade_creation_date}
                      </Moment>
                    </p>
                    <p>
                      By coach with ID of: {move.wrestler_1_grade_graded_by}{" "}
                    </p>

                    <label>New grade: </label>
                    <input
                      type="number"
                      onChange={onWrestler1GradeChange}
                      placeholder="0, 1, 2, or 3"
                    />
                    <div className="" style={{ width: "50%" }}></div>
                    <label>Notes: </label>
                    <textarea
                      rows={5}
                      cols={30}
                      onChange={onWrestler1NoteChange}
                    ></textarea>
                    <div className="" style={{ width: "50%" }}></div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        submitGrade(
                          move.id,
                          props.wrestler1Id,
                          wrestler1NewGrade,
                          wrestler1NewNote,
                          move.maximum_grade
                        );
                      }}
                    >
                      Update grade and notes for {move.wrestler_1_first_name}{" "}
                      {move.wrestler_1_last_name}
                    </button>
                  </div>
                  <div
                    className="my-1 p-2"
                    style={{ border: "solid black 1px" }}
                  >
                    <h6 className="text text-center">
                      {move.wrestler_2_first_name} {move.wrestler_2_last_name}
                    </h6>
                    <p>Current grade: {move.wrestler_2_grade}</p>
                    <p>Current notes: {move.wrestler_2_movement_notes}</p>
                    <p>
                      Last graded:{" "}
                      <Moment fromNow>
                        {move.wrestler_2_grade_creation_date}
                      </Moment>
                    </p>
                    <p>
                      By coach with ID of: {move.wrestler_2_grade_graded_by}{" "}
                    </p>

                    <label>New grade: </label>
                    <input
                      type="number"
                      onChange={onWrestler2GradeChange}
                      placeholder="0, 1, 2, or 3"
                    />
                    <div className="" style={{ width: "50%" }}></div>
                    <label>Notes: </label>
                    <textarea
                      rows={5}
                      cols={30}
                      onChange={onWrestler2NoteChange}
                    ></textarea>
                    <div className="" style={{ width: "50%" }}></div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        submitGrade(
                          move.id,
                          props.wrestler2Id,
                          wrestler2NewGrade,
                          wrestler2NewNote,
                          move.maximum_grade
                        );
                      }}
                    >
                      Update grade and notes for {move.wrestler_2_first_name}{" "}
                      {move.wrestler_2_last_name}
                    </button>
                  </div>
                </div>

                <hr />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </>
  );
}

export default GradesOfXFor2Wrestlers;
