import * as React from "react";
import GradesOfXFor2Wrestlers from "./GradesOfXFor2Wrestlers";
import Moment from "react-moment";
import { Link, useHistory } from "react-router-dom";
import MoveSearchFor2Wrestlers from "./MoveSearchFor2Wrestlers";
import GradingDashboardFor2Wrestlers from "./GradingDashboardFor2Wrestlers";

const CoachesView = (props: CoachesViewProps) => {
  const [userThatIsOnThisPage, setUserThatIsOnThisPage] = React.useState([]);
  const [personal_info, setPersonalInfo] = React.useState([]);
  const [wrestler1Id, setWrestler1Id] = React.useState<number>();
  const [wrestler2Id, setWrestler2Id] = React.useState<number>();
  const [wrestler1NewGrade, setWrestler1NewGrade] = React.useState();
  const [wrestler2NewGrade, setWrestler2NewGrade] = React.useState();
  const [wrestler1NewNote, setWrestler1NewNote] = React.useState();
  const [wrestler2NewNote, setWrestler2NewNote] = React.useState();
  const [level, setLevel] = React.useState();
  const [
    gradesForBothWrestlersOnCurrentLevel,
    setGradesForBothWrestlersOnCurrentLevel,
  ] = React.useState([]);
  let history = useHistory();

  let token = sessionStorage.getItem("token");
  let UID = sessionStorage.getItem("UID");
  let color1 = "red";
  let color2 = "yellow";
  let color3 = "green";

  //for autocomplete of wrestler names
  const onWrestler1Change = (event: any) => {
    let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
    let wrestlerIdAfterSlice = event.target.value.slice(
      whereToSliceFrom,
      event.target.value.length
    );
    setWrestler1Id(Number(wrestlerIdAfterSlice));
  };
  const onWrestler2Change = (event: any) => {
    let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
    let wrestlerIdAfterSlice = event.target.value.slice(
      whereToSliceFrom,
      event.target.value.length
    );
    setWrestler2Id(Number(wrestlerIdAfterSlice));
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

  let logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("UID");
    history.push("/");
  };

  //gets all of the user_profiles
  React.useEffect(() => {
    fetch("/api/personal_info", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setPersonalInfo(results);
      });
  }, []);

  //gets the current user so I can send non-coaches away and laugh in their faces...
  React.useEffect(() => {
    fetch(`/api/users/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setUserThatIsOnThisPage(results);
      });
  }, []);

  let getGradesForBothWrestlers = () => {
    if (userThatIsOnThisPage[0].role === "wrestler") {
      alert(
        "Hahahahaha! You're trying to grade wrestlers now? You haven't even mastered drilling yet. Get back to work scrub!"
      );
      history.push("/wrestlersview");
    } else {
    }
    try {
      fetch(
        `/api/grades/gradesForTwoWresltersOnASpecificLevel/${wrestler1Id}&${wrestler2Id}&${level}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((results) => {
          setGradesForBothWrestlersOnCurrentLevel(results);
        });
    } catch (error) {
      console.log("something is not working here");
    }
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
        alert(
          `A grade of ${grade} was entered for wrestler with user ID: ${user_id}`
        );
      } else {
        alert("it didn't work!");
      }
    });
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <p>
            <strong>
              {" "}
              This page is for coaches only. Little scrubs don't have permission
              to do anything on this page, so get
              <Link to={`/wrestlersview`}> back to studying...</Link>
            </strong>
          </p>

          <button className="btn btn-outline-success" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <h3>Grading:</h3>
      <p>A grade of 1 means the wrestler needs a lot of work on the move.</p>
      <p>
        A grade of 2 means the wrestler has a decent grasp of the move, but is
        still working on a few details.
      </p>
      <p>
        A grade of 3 means the wrestler knows the movement by it's name, and can
        demonstrate it perfectly without hesitation. If a wrestler needed any
        help whatsoever, or got any of the details incorrect, they should not
        receive a 3.
      </p>
      <p>
        <strong>
          Grading should be strict. It's better to undergrade and have a
          wrestler end up drilling something more than neccessary, than it is to
          move past something that they haven't truely mastered. The purpose of
          the curriculum is to serve as a path to MASTERY. Do not rush it!
        </strong>
      </p>

      <div className="card"></div>
      <h3>
        You must always start by selecting two wrestlers before doing anything
        else. If you mess this up, refresh the page and start again.
      </h3>
      <label className="h4">Wrestler 1: </label>
      <input type="text" list="wrestler1List" onChange={onWrestler1Change} />
      <datalist id="wrestler1List">
        {personal_info.map((wrestler) => {
          return (
            <option
              key={wrestler.user_id}
              value={
                wrestler.first_name +
                " " +
                wrestler.last_name +
                " -+- " +
                String(wrestler.user_id)
              }
            ></option>
          );
        })}
      </datalist>

      <label className="h4">Wrestler 2: </label>
      <input type="text" list="wrestler2List" onChange={onWrestler2Change} />
      <datalist id="wrestler2List">
        {personal_info.map((wrestler) => {
          return (
            <option
              key={wrestler.user_id}
              value={
                wrestler.first_name +
                " " +
                wrestler.last_name +
                " -+- " +
                String(wrestler.user_id)
              }
            ></option>
          );
        })}
      </datalist>

      <label className="h4">Select Level: </label>
      <input type="number" onChange={onLevelChange} />
      <button className="btn btn-primary" onClick={getGradesForBothWrestlers}>
        Get grades for wrestlers
      </button>
      <div className="divForLevel">
        {gradesForBothWrestlersOnCurrentLevel.map((move) => {
          return (
            <div key={move.id}>
              <div className="mt-5 d-flex justify-content-around flex-wrap">
                <div className="" style={{ width: "100vw" }}>
                  <h4>
                    {move.number_for_ordering}. {move.name_of_video}
                  </h4>
                </div>

                <div className="">
                  <iframe
                    width="95%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${move.url_to_video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                  ></iframe>
                </div>
                <div className="">
                  <iframe
                    width="95%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  ></iframe>
                </div>

                <div className="">
                  <p>
                    {move.wrestler_1_first_name} {move.wrestler_1_last_name}
                  </p>
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
                  <p>By coach with ID of: {move.wrestler_1_grade_graded_by} </p>
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

                <div className="">
                  <p>
                    {move.wrestler_2_first_name} {move.wrestler_2_last_name}
                  </p>
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
                  <p>By coach with ID of: {move.wrestler_2_grade_graded_by}</p>
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
            </div>
          );
        })}
      </div>
      <hr />
      <GradesOfXFor2Wrestlers
        wrestler1Id={wrestler1Id}
        wrestler2Id={wrestler2Id}
      />
      <hr />
      <MoveSearchFor2Wrestlers
        wrestler1Id={wrestler1Id}
        wrestler2Id={wrestler2Id}
      />
      <GradingDashboardFor2Wrestlers
        wrestler1UID={wrestler1Id}
        Wrestler1first_name={"testfirstname"}
        Wrestler1last_name={"testlastname"}
        wrestler2UID={wrestler2Id}
        Wrestler2first_name={"testfirstname2"}
        Wrestler2last_name={"testlastname2"}
      />
    </>
  );
};

interface CoachesViewProps {}

export default CoachesView;
