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
    note: string
  ) => {
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
        alert("Grade Updated!");
      } else {
        alert("it didn't work!");
      }
    });
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
              <div className="d-flex">
                <div className="">
                  <h4>
                    {move.number_for_ordering}. {move.name_of_video}
                  </h4>
                </div>
                <div className="">
                  <iframe
                    src={`https://www.youtube.com/embed/${move.url_to_video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                  ></iframe>
                </div>
                <div className="">
                  <iframe
                    src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  ></iframe>
                </div>
                <div className="flex-grow-1">
                  <label>current grade: </label>
                  <input
                    type="number"
                    defaultValue={move.wrestler_1_grade}
                    onChange={onWrestler1GradeChange}
                  />
                  <p>
                    Last graded:{" "}
                    <Moment fromNow>
                      {move.wrestler_1_grade_creation_date}
                    </Moment>
                  </p>
                  <p>By coach: </p>
                  <label>Coaches' notes: </label>
                  <br />
                  <textarea
                    style={{ width: 100 }}
                    onChange={onWrestler1NoteChange}
                    defaultValue={move.wrestler_1_movement_notes}
                  ></textarea>
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      submitGrade(
                        move.id,
                        props.wrestler1Id,
                        wrestler1NewGrade,
                        wrestler1NewNote
                      );
                    }}
                  >
                    Update Grade and notes for {move.wrestler_1_first_name}{" "}
                    {move.wrestler_1_last_name}
                  </button>
                </div>
                <div className="flex-grow-1">
                  <label>current grade: </label>
                  <input
                    type="number"
                    onChange={onWrestler2GradeChange}
                    defaultValue={move.wrestler_2_grade}
                  />
                  <p>
                    Last graded:{" "}
                    <Moment fromNow>
                      {move.wrestler_2_grade_creation_date}
                    </Moment>
                  </p>
                  <p>By coach: </p>
                  <label>Coaches' notes: </label>
                  <textarea
                    onChange={onWrestler2NoteChange}
                    defaultValue={move.wrestler_2_movement_notes}
                  ></textarea>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      submitGrade(
                        move.id,
                        props.wrestler2Id,
                        wrestler2NewGrade,
                        wrestler2NewNote
                      );
                    }}
                  >
                    Update Grade and notes for {move.wrestler_2_first_name}{" "}
                    {move.wrestler_2_last_name}
                  </button>
                </div>
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
