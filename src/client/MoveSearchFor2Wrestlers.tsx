import React from "react";
import Moment from "react-moment";

function MoveSearchFor2Wrestlers(props: any) {
  let [searchedMoveId, setSearchedMoveId] = React.useState();
  const [allGrades, setAllGrades] = React.useState([]);
  const [wrestler1NewGrade, setWrestler1NewGrade] = React.useState();
  const [wrestler2NewGrade, setWrestler2NewGrade] = React.useState();
  const [wrestler1NewNote, setWrestler1NewNote] = React.useState();
  const [wrestler2NewNote, setWrestler2NewNote] = React.useState();
  const [allMoves, setAllMoves] = React.useState([]);
  const [searchedMoveObject, setSearchedMoveObject] = React.useState<any>({});

  let token = sessionStorage.getItem("token");
  let UID = sessionStorage.getItem("UID");

  let onMoveChange = (event: any) => {
    let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
    let moveIdAfterSlice = event.target.value.slice(
      whereToSliceFrom,
      event.target.value.length
    );

    setSearchedMoveId(moveIdAfterSlice);
  };

  React.useEffect(() => {
    if (props.wrestler1Id) {
      try {
        //this fetches all of the moves, not all of the grades. Terrible variable naming...
        fetch(
          `/api/grades/allCurrentGradesForASingleWrestler/${props.wrestler1Id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
          .then((res) => res.json())
          .then((results) => {
            setAllMoves(results);
          });
      } catch (error) {
        console.log("something is not working here");
      }
    }
  }, [props.wrestler1Id, props.wrestler2Id]);

  React.useEffect(() => {
    if (props.wrestler1Id) {
      console.log("running");
      try {
        fetch(
          `/api/grades/allGradesForTwoWrestlers/${props.wrestler1Id}&${props.wrestler2Id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
          .then((res) => res.json())
          .then((results) => {
            setAllGrades(results);
          });
      } catch (error) {
        console.log("something is not working here");
      }
    }
  }, [searchedMoveId]);

  React.useEffect(() => {
    for (let x = 0; x < allGrades.length; x++) {
      if (allGrades[x].id === Number(searchedMoveId)) {
        setSearchedMoveObject(allGrades[x]);
      }
    }
  }, [searchedMoveId]);

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
        coach_user_id: UID,
        student_user_id: user_id,
        grade: grade,
        movement_notes: note,
      }),
    };
    fetch(`/api/grades/`, requestOptions).then((res) => {
      if (res.ok) {
        alert("Grade Updated!");
        props.incrementUselessStateFunction();
      } else {
        alert("it didn't work!");
      }
    });
  };

  return (
    <>
      <label className="h4">Search by move: </label>
      <input type="text" list="moveList" onChange={onMoveChange} />
      <datalist id="moveList">
        {allMoves.map((move) => {
          return (
            <option
              key={move.id}
              value={move.name_of_video + " -+- " + String(move.id)}
            ></option>
          );
        })}
      </datalist>

      <div className="divForLevel">
        <div key={searchedMoveObject.id}>
          <div className="mt-5">
            <div className="" style={{ width: "100vw" }}>
              <h4 className="text text-center">
                {searchedMoveObject.number_for_ordering}.{" "}
                {searchedMoveObject.name_of_video}
              </h4>
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <div className="mx-1">
                <iframe
                  src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_video}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                ></iframe>
              </div>
              <div className="mx-1">
                <iframe
                  src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_looped_video}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                ></iframe>
              </div>
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <div
                className="my-1 mx-1 p-2"
                style={{ border: "black solid 1px" }}
              >
                <p>
                  {searchedMoveObject.wrestler_1_first_name}{" "}
                  {searchedMoveObject.wrestler_1_last_name}
                </p>
                <label>current grade: </label>
                <input
                  type="number"
                  defaultValue={searchedMoveObject.wrestler_1_grade}
                  onChange={onWrestler1GradeChange}
                />
                <p>
                  Last graded:{" "}
                  <Moment fromNow>
                    {searchedMoveObject.wrestler_1_grade_creation_date}
                  </Moment>
                </p>
                <p>By coach: </p>
                <label>Coaches' notes: </label>
                <textarea
                  onChange={onWrestler1NoteChange}
                  defaultValue={searchedMoveObject.wrestler_1_movement_notes}
                ></textarea>
                <div className="" style={{ width: "50%" }}></div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    submitGrade(
                      searchedMoveObject.id,
                      props.wrestler1Id,
                      wrestler1NewGrade,
                      wrestler1NewNote
                    );
                  }}
                >
                  Update Grade and notes for{" "}
                  {searchedMoveObject.wrestler_1_first_name}{" "}
                  {searchedMoveObject.wrestler_1_last_name}
                </button>
              </div>
              <div
                className="my-1 mx-1 p-2"
                style={{ border: "black solid 1px" }}
              >
                <p>
                  {searchedMoveObject.wrestler_2_first_name}{" "}
                  {searchedMoveObject.wrestler_2_last_name}
                </p>
                <label>current grade: </label>
                <input
                  type="number"
                  onChange={onWrestler2GradeChange}
                  defaultValue={searchedMoveObject.wrestler_2_grade}
                />
                <p>
                  Last graded:{" "}
                  <Moment fromNow>
                    {searchedMoveObject.wrestler_2_grade_creation_date}
                  </Moment>
                </p>
                <p>By coach: </p>
                <label>Coaches' notes: </label>
                <textarea
                  onChange={onWrestler2NoteChange}
                  defaultValue={searchedMoveObject.wrestler_2_movement_notes}
                ></textarea>
                <div className="" style={{ width: "50%" }}></div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    submitGrade(
                      searchedMoveObject.id,
                      props.wrestler2Id,
                      wrestler2NewGrade,
                      wrestler2NewNote
                    );
                  }}
                >
                  Update Grade and notes for{" "}
                  {searchedMoveObject.wrestler_2_first_name}{" "}
                  {searchedMoveObject.wrestler_2_last_name}
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}

export default MoveSearchFor2Wrestlers;
