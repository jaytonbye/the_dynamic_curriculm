import * as React from "react";

//I am getting "Warning: Each child in a list should have a unique "key" prop." for this page, but i'm not sure why. I don't think I have a list?

const CoachesView = (props: CoachesViewProps) => {
  const [personal_info, setPersonalInfo] = React.useState([]);
  const [wrestler1Id, setWrestler1Id] = React.useState();
  const [wrestler2Id, setWrestler2Id] = React.useState();
  const [wrestler1NewGrade, setWrestler1NewGrade] = React.useState();
  const [wrestler2NewGrade, setWrestler2NewGrade] = React.useState();
  const [wrestler1NewNote, setWrestler1NewNote] = React.useState();
  const [wrestler2NewNote, setWrestler2NewNote] = React.useState();
  const [level, setLevel] = React.useState(); //should I initialize this with null?
  const [
    gradesForBothWrestlersOnCurrentLevel,
    setGradesForBothWrestlersOnCurrentLevel,
  ] = React.useState([]);

  //for autocomplete of wrestler names
  const onWrestler1Change = (event: any) => {
    setWrestler1Id(event.target.value);
  };
  const onWrestler2Change = (event: any) => {
    setWrestler2Id(event.target.value);
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
  const onLevelChange = (event: any) => {
    setLevel(event.target.value);
  };

  //gets all of the user_profiles
  React.useEffect(() => {
    fetch("http://localhost:3000/api/personal_info")
      .then((res) => res.json())
      .then((results) => {
        setPersonalInfo(results);
      });
  }, []);

  let getGradesForBothWrestlers = () => {
    fetch(
      `http://localhost:3000/api/grades/gradesForTwoWresltersOnASpecificLevel/${wrestler1Id}&${wrestler2Id}&${level}`
    )
      .then((res) => res.json())
      .then((results) => {
        setGradesForBothWrestlersOnCurrentLevel(results);
      });
  };

  let submitGrade = (
    video_id: number,
    user_id: number,
    grade: number,
    note: string
  ) => {
    // put fetch request for update here
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        video_id: video_id,
        coach_user_id: 10, //until we have logins
        student_user_id: user_id,
        grade: grade,
        movement_notes: note,
      }),
    };
    fetch(`http://localhost:3000/api/grades/`, requestOptions).then((res) => {
      if (res.ok) {
        alert("Grade Updated!");
      } else {
        alert("it didn't work!");
      }
    });
  };

  return (
    <>
      <h1>coaches' view</h1>
      <label>Wrestler 1: </label>
      <input type="text" list="wrestler1List" onChange={onWrestler1Change} />
      <datalist id="wrestler1List">
        {personal_info.map((wrestler) => {
          return (
            <option value={wrestler.user_id}>
              {wrestler.first_name + " " + wrestler.last_name}
            </option>
          );
        })}
      </datalist>

      <label>Wrestler 2: </label>
      <input type="text" list="wrestler2List" onChange={onWrestler2Change} />
      <datalist id="wrestler2List">
        {personal_info.map((wrestler) => {
          return (
            <option value={wrestler.user_id}>
              {wrestler.first_name + " " + wrestler.last_name}
            </option>
          );
        })}
      </datalist>

      <label>Select Level: </label>
      <input type="number" onChange={onLevelChange} />
      <button className="btn btn-primary" onClick={getGradesForBothWrestlers}>
        Get grades for wrestlers
      </button>
      <div className="divForLevel">
        <h1 className="text text-center">Level {level}</h1>
        {gradesForBothWrestlersOnCurrentLevel.map((move) => {
          return (
            <>
              <div className="row col-12 mt-5 d-flex justify-content-around">
                <div className="col-2">
                  <h4>
                    {move.number_for_ordering}. {move.name_of_video}
                  </h4>
                </div>
                <div className="col-2">
                  <iframe
                    src={`https://www.youtube.com/embed/${move.url_to_video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                  ></iframe>
                </div>
                <div className="col-2">
                  <iframe
                    src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  ></iframe>
                </div>
                <div className="col-2">
                  <label>current grade: </label>
                  <input
                    type="number"
                    defaultValue={move.wrestler_1_grade}
                    onChange={onWrestler1GradeChange}
                  />
                  <label>Coaches' notes: </label>
                  <textarea
                    onChange={onWrestler1NoteChange}
                    defaultValue={move.wrestler_1_movement_notes}
                  ></textarea>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      submitGrade(
                        move.id,
                        wrestler1Id,
                        wrestler1NewGrade,
                        wrestler1NewNote
                      );
                    }}
                  >
                    Update Grade and notes for {move.wrestler_1_first_name}{" "}
                    {move.wrestler_1_last_name}
                  </button>
                </div>
                <div className="col-2">
                  <label>current grade: </label>
                  <input
                    type="number"
                    onChange={onWrestler2GradeChange}
                    defaultValue={move.wrestler_2_grade}
                  />
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
                        wrestler2Id,
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
};

interface CoachesViewProps {}

export default CoachesView;
