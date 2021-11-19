import React from "react";
import Moment from "react-moment";
import classNames from "classnames";

export default function AllGradesAllLevels(props: any) {
  const [grades, setGrades] = React.useState([]);
  const [wrestler1NewGrade, setWrestler1NewGrade] = React.useState();
  const [wrestler2NewGrade, setWrestler2NewGrade] = React.useState();
  const [wrestler1NewNote, setWrestler1NewNote] = React.useState<string>();
  const [wrestler2NewNote, setWrestler2NewNote] = React.useState<string>();
  const [uselessState2, setUselessState2] = React.useState(0);

  const incrementUselessState2 = () => {
    setUselessState2(uselessState2 + 1);
  };

  let UID = sessionStorage.getItem("UID");
  let token = sessionStorage.getItem("token");

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
    coach_user_id: number,
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
          coach_user_id: coach_user_id,
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
          incrementUselessState2();
        } else {
          alert(
            "GRADE NOT SUBMITTED! Something went wrong. Try logging out and then logging in again."
          );
        }
      });
    }
    // clears the state of the notes, so we don't accidentally enter the wrong notes for the next move.
    setWrestler1NewNote("");
    setWrestler2NewNote("");
  };

  React.useEffect(() => {
    fetch(
      `/api/grades/gradesForTwoWresltersOnAllLevels/${props.wrestler1Id}&${props.wrestler2Id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((results) => {
        setGrades(results);
      });
  }, [uselessState2]);

  return (
    <>
      <table className="table ">
        <thead className="sticky-top">
          <tr className="bg-light">
            <th>Level</th>
            <th>Name</th>
            <th>Link to detailed video explanation</th>
            <th>Link to looped video</th>
            <th>{props.wrestler1FullName}'s grade</th>
            <th>{props.wrestler1FullName}'s notes</th>
            <th>Last graded</th>
            <th>{props.wrestler1FullName}'s new grade</th>
            <th>{props.wrestler1FullName}'s new notes</th>
            <th>Submit button</th>
            <th>{props.wrestler2FullName}'s grade</th>
            <th>{props.wrestler2FullName}'s notes</th>
            <th>Last graded</th>
            <th>{props.wrestler2FullName}'s new grade</th>
            <th>{props.wrestler2FullName}'s new notes</th>
            <th>Submit button</th>
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
                    gradeOf3: video.wrestler_1_grade === 3,
                    gradeOf2: video.wrestler_1_grade === 2,
                    gradeOf1: video.wrestler_1_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_1_grade > 3 || video.wrestler_1_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  {video.wrestler_1_grade}
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_1_grade === 3,
                    gradeOf2: video.wrestler_1_grade === 2,
                    gradeOf1: video.wrestler_1_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_1_grade > 3 || video.wrestler_1_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  {video.wrestler_1_movement_notes}
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_1_grade === 3,
                    gradeOf2: video.wrestler_1_grade === 2,
                    gradeOf1: video.wrestler_1_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_1_grade > 3 || video.wrestler_1_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  Last graded by coach with user ID:{" "}
                  {video.wrestler_1_grade_graded_by}
                  {" - "}
                  <Moment fromNow>
                    {video.wrestler_1_grade_creation_date}
                  </Moment>
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_1_grade === 3,
                    gradeOf2: video.wrestler_1_grade === 2,
                    gradeOf1: video.wrestler_1_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_1_grade > 3 || video.wrestler_1_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  <input
                    type="number"
                    onChange={onWrestler1GradeChange}
                    style={{ width: "50px" }}
                    placeholder={`0-${video.maximum_grade}`}
                  />
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_1_grade === 3,
                    gradeOf2: video.wrestler_1_grade === 2,
                    gradeOf1: video.wrestler_1_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_1_grade > 3 || video.wrestler_1_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  <textarea
                    rows={10}
                    cols={10}
                    onChange={onWrestler1NoteChange}
                    placeholder="add notes"
                  ></textarea>
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_1_grade === 3,
                    gradeOf2: video.wrestler_1_grade === 2,
                    gradeOf1: video.wrestler_1_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_1_grade > 3 || video.wrestler_1_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      submitGrade(
                        video.id,
                        props.wrestler1Id,
                        wrestler1NewGrade,
                        wrestler1NewNote,
                        Number(UID),
                        video.maximum_grade
                      );
                    }}
                  >
                    Update grade and notes for{" "}
                    <strong>
                      {video.wrestler_1_first_name} {video.wrestler_1_last_name}
                    </strong>
                  </button>
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_2_grade === 3,
                    gradeOf2: video.wrestler_2_grade === 2,
                    gradeOf1: video.wrestler_2_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_2_grade > 3 || video.wrestler_2_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  {video.wrestler_2_grade}
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_2_grade === 3,
                    gradeOf2: video.wrestler_2_grade === 2,
                    gradeOf1: video.wrestler_2_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_2_grade > 3 || video.wrestler_2_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  {video.wrestler_2_movement_notes}
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_2_grade === 3,
                    gradeOf2: video.wrestler_2_grade === 2,
                    gradeOf1: video.wrestler_2_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_2_grade > 3 || video.wrestler_2_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  Last graded by coach with user ID:{" "}
                  {video.wrestler_2_grade_graded_by}
                  {" - "}
                  <Moment fromNow>
                    {video.wrestler_2_grade_creation_date}
                  </Moment>
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_2_grade === 3,
                    gradeOf2: video.wrestler_2_grade === 2,
                    gradeOf1: video.wrestler_2_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_2_grade > 3 || video.wrestler_2_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  <input
                    type="number"
                    onChange={onWrestler2GradeChange}
                    style={{ width: "50px" }}
                    placeholder={`0-${video.maximum_grade}`}
                  />
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_2_grade === 3,
                    gradeOf2: video.wrestler_2_grade === 2,
                    gradeOf1: video.wrestler_2_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_2_grade > 3 || video.wrestler_2_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  <textarea
                    rows={10}
                    cols={10}
                    onChange={onWrestler2NoteChange}
                    placeholder="add notes"
                  ></textarea>
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.wrestler_2_grade === 3,
                    gradeOf2: video.wrestler_2_grade === 2,
                    gradeOf1: video.wrestler_2_grade === 1,
                    gradeOfIncorrect:
                      video.wrestler_2_grade > 3 || video.wrestler_2_grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      submitGrade(
                        video.id,
                        props.wrestler2Id,
                        wrestler2NewGrade,
                        wrestler2NewNote,
                        Number(UID),
                        video.maximum_grade
                      );
                    }}
                  >
                    Update grade and notes for{" "}
                    <strong>
                      {video.wrestler_2_first_name} {video.wrestler_2_last_name}
                    </strong>
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
