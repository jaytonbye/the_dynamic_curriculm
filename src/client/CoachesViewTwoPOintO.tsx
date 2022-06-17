import * as React from "react";
import GradesOfXFor2Wrestlers from "./GradesOfXFor2Wrestlers";
import Moment from "react-moment";
import { Link, useHistory, Route, BrowserRouter } from "react-router-dom";
import DropDownForMovesAndWrestlers from "./DropDownForMovesAndWrestlers";
import MoveSearchFor2Wrestlers from "./MoveSearchFor2Wrestlers";

import GradingDashboardFor2WrestlersTwoPointO from "./GradingDashBoardForTwoWrestlersTwoPointO";
import AllGradesAllLevelsFor2Wrestlers from "./AllGradesAllLevelsFor2Wrestlers";
import NavigationBar from "./NavigationBar";
import GradingKey from "./GradingKey";
import classNames from "classnames";

const CoachesView = (props: CoachesViewProps) => {
  ///DROPDOWN START 1/3
  let [displayDropDownWrestler1, setDisplayDropDownWrestler1] =
    React.useState(false);
  let [dropDownInputValueWrestler1, setDropDownInputValueWrestler1] =
    React.useState("");
  let [displayDropDownWrestler2, setDisplayDropDownWrestler2] =
    React.useState(false);
  let [dropDownInputValueWrestler2, setDropDownInputValueWrestler2] =
    React.useState("");
  let wrapperRef = React.useRef(null); //this closes autocomplete list when mouse clicks off of it
  let wrapperRef2 = React.useRef(null); //this closes autocomplete list when mouse clicks off of it
  ///DROP END
  const [userThatIsOnThisPage, setUserThatIsOnThisPage] = React.useState<any>(
    []
  );
  const [personal_info, setPersonalInfo] = React.useState([]);
  const [wrestler1Id, setWrestler1Id] = React.useState<number>();
  const [wrestler2Id, setWrestler2Id] = React.useState<number>();
  const [wrestler1NewGrade, setWrestler1NewGrade] = React.useState<any>({});
  const [wrestler2NewGrade, setWrestler2NewGrade] = React.useState<any>({});
  const [wrestler1NewNote, setWrestler1NewNote] = React.useState<any>({});
  const [wrestler2NewNote, setWrestler2NewNote] = React.useState<any>({});
  const [level, setLevel] = React.useState();
  const [
    gradesForBothWrestlersOnCurrentLevel,
    setGradesForBothWrestlersOnCurrentLevel,
  ] = React.useState([]);
  const [showAllGrades, setShowAllGrades] = React.useState(false);
  const [wrestler1FullName, setWrestler1FullName] = React.useState("");
  const [wrestler2FullName, setWrestler2FullName] = React.useState("");
  const [uselessState3, setUselessState3] = React.useState(0);

  //The purpose of using useless state is so that we rerender the child component "Grading Dashboard For 2 Wrestlers" whenever a grade is changed. To do this, we use the function "incrementUselessState" to update the key prop.
  const [uselessState, setUselessState] = React.useState(0);

  let history = useHistory();

  let token = localStorage.getItem("token");
  let UID = localStorage.getItem("UID");

  //DROPDOWN START 2/3
  // React.useEffect(() => {
  //   for (let x = 0; x < personal_info.length; x++) {
  //     if (personal_info[x].id === Number(wrestlerId)) {
  //       setSearchedMoveObject(personal_info[x]);
  //     }
  //   }
  // }, [wrestlerId]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickedOutsideDropdown);
    document.addEventListener("mousedown", handleClickedOutsideDropdown2);

    return () => {
      document.removeEventListener("mousedown", handleClickedOutsideDropdown);
      document.removeEventListener("mousedown", handleClickedOutsideDropdown2);
    };
  }, []);

  let handleClickedOutsideDropdown = (e: any) => {
    let { current: wrap }: any = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplayDropDownWrestler1(false);
      // setDisplayDropDownWrestler2(false);
    }
  };
  let handleClickedOutsideDropdown2 = (e: any) => {
    let { current: wrap }: any = wrapperRef2;
    if (wrap && !wrap.contains(e.target)) {
      // setDisplayDropDownWrestler1(false);
      setDisplayDropDownWrestler2(false);
    }
  };
  //DROPDOWN END

  //for autocomplete of wrestler names
  // Bull shit hack that needs to be fixed
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
    setWrestler1NewGrade((prevState: any) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const onWrestler2GradeChange = (event: any) => {
    setWrestler2NewGrade((prevState: any) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const onWrestler1NoteChange = (event: any) => {
    setWrestler1NewNote((prevState: any) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const onWrestler2NoteChange = (event: any) => {
    setWrestler2NewNote((prevState: any) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onLevelChange = (event: any) => {
    setLevel(event.target.value);
  };

  //gets all of the user_profiles for proper tenant
  React.useEffect(() => {
    fetch(`/api/personal_info/${UID}`, {
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

  let laughInWrestlersFace = () => {
    alert(
      "Hahahahaha! You're trying to grade wrestlers now? You haven't even mastered drilling yet. Get back to work scrub!"
    );
    history.push("/wrestlersview");
  };

  //shows all grades and also gets the wrestler's names
  let switchShowAllGrades = () => {
    if (
      userThatIsOnThisPage[0].role !== "coach" &&
      userThatIsOnThisPage[0].role !== "admin"
    ) {
      laughInWrestlersFace();
    } else {
      personal_info.map((person: any) => {
        if (person.user_id === wrestler1Id) {
          setWrestler1FullName(person.first_name + " " + person.last_name);
        }
      });

      personal_info.map((person2: any) => {
        if (person2.user_id === wrestler2Id) {
          setWrestler2FullName(person2.first_name + " " + person2.last_name);
        }
      });
      setShowAllGrades(!showAllGrades);
    }
  };

  let getGradesForBothWrestlers = () => {
    if (
      userThatIsOnThisPage[0].role !== "coach" &&
      userThatIsOnThisPage[0].role !== "admin"
    ) {
      laughInWrestlersFace();
    } else {
      try {
        fetch(
          `/api/grades/gradesForTwoWresltersOnASpecificLevel/${wrestler1Id}/${wrestler2Id}/${level}/${UID}`,
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
    }
  };

  React.useEffect(() => {
    if (uselessState3 > 0) {
      fetch(
        `/api/grades/gradesForTwoWresltersOnASpecificLevel/${wrestler1Id}/${wrestler2Id}/${level}/${UID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((results) => {
          setGradesForBothWrestlersOnCurrentLevel(results);
        });
    }
  }, [uselessState3]);

  let submitGrade = (
    video_id: number,
    user_id: number,
    grade: number,
    note: string,
    maximum_grade: number
  ) => {
    if (grade > maximum_grade) {
      alert(
        `GRADE NOT SUBMITTED! You cannot submit a grade higher than a maximum of ${maximum_grade} for this move`
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
          coach_user_id: UID,
          student_user_id: user_id,
          grade: Number(grade),
          movement_notes: note,
        }),
      };
      fetch(`/api/grades/`, requestOptions).then((res) => {
        if (res.ok) {
          alert(
            `A grade of ${grade} was entered for wrestler with user ID: ${user_id}`
          );
          incrementUselessState();
          incrementUselessState3();
        } else {
          alert(
            "GRADE NOT SUBMITTED! Something went wrong, try logging in again"
          );
        }
      });
    }
  };

  let incrementUselessState = () => {
    setUselessState(uselessState + 1);
  };
  let incrementUselessState3 = () => {
    setUselessState3(uselessState3 + 1);
  };

  // make a function that will select a random user from the list of users
  // let randomUser = () => {
  //     let randomNumber = Math.floor(Math.random() * personal_info.length);
  //     setWrestler1Id(personal_info[randomNumber].user_id);
  //     setWrestler1FullName(personal_info[randomNumber].first_name + " " + personal_info[randomNumber].last_name);
  // };

  // let randomUser2 = () => {
  //     let randomNumber = Math.floor(Math.random() * personal_info.length);
  //     setWrestler2Id(personal_info[randomNumber].user_id);
  //     setWrestler2FullName(personal_info[randomNumber].first_name + " " + personal_info[randomNumber].last_name);
  // };

  return (
    <>
      <NavigationBar />
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
        </div>
      </nav>
      <div className="ml-2">
        <GradingKey />
        <p>
          <strong>
            Grading should be strict. It's better to under-grade and have a
            wrestler end up drilling something more than necessary, than it is
            to move past something that they haven't truly mastered. The purpose
            of the curriculum is to serve as a path to MASTERY. Do not rush it!
          </strong>
        </p>
        <div className="card"></div>
        <div className="" style={{ width: "100%" }}></div>
        <div className="mt-1">
          {/* ///DROPDOWN START 3/3*/}
          <div className="d-flex flex wrap justify-content-start col-11 p-0">
            <div
              style={{ width: "400px" }}
              className="d-flex flex-wrap justify-content-start align-items-center col-11 p-0"
            >
              <label className="h4 p-0 text-center">Wrestler 1:</label>
              <div ref={wrapperRef}>
                <DropDownForMovesAndWrestlers
                  // first select if drop is for moves or people
                  isMovesList={false}
                  isPersonList={true}
                  // fill in proper values for dropdown
                  dropDownInputValue={dropDownInputValueWrestler1}
                  setDropDownInputValue={setDropDownInputValueWrestler1}
                  displayDropDown={displayDropDownWrestler1}
                  setDisplayDropDown={setDisplayDropDownWrestler1}
                  // If for moves fill proper values. else make these null
                  videosByTenant={null}
                  setSearchedMoveId={null}
                  // If for people fill proper values. else make these null
                  personal_info={personal_info} //list of people
                  setWrestlerId={setWrestler1Id}
                />
              </div>
            </div>
          </div>
          {/* DROPDOWN END  */}
          {/* <label className="h4 ">Wrestler 1: </label>
          <input
            type="text"
            list="wrestler1List"
            onChange={onWrestler1Change}
          />
          <datalist id="wrestler1List">
            {personal_info.map((wrestler: any) => {
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
          </datalist> */}
        </div>
        <div className="" style={{ width: "100%" }}></div>
        {/* ///DROPDOWN START 3/3*/}
        <div className="d-flex flex wrap justify-content-start col-11 p-0">
          <div
            style={{ width: "400px" }}
            className="d-flex flex-wrap justify-content-start align-items-center col-11 p-0"
          >
            <label className="h4 p-0 text-center">Wrestler 2:</label>
            <div ref={wrapperRef2}>
              <DropDownForMovesAndWrestlers
                // first select if drop is for moves or people
                isMovesList={false}
                isPersonList={true}
                // fill in proper values for dropdown
                dropDownInputValue={dropDownInputValueWrestler2}
                setDropDownInputValue={setDropDownInputValueWrestler2}
                displayDropDown={displayDropDownWrestler2}
                setDisplayDropDown={setDisplayDropDownWrestler2}
                // If for moves fill proper values. else make these null
                videosByTenant={null}
                setSearchedMoveId={null}
                // If for people fill proper values. else make these null
                personal_info={personal_info} //list of people
                setWrestlerId={setWrestler2Id}
              />
            </div>
          </div>
        </div>
        {/* DROPDOWN END  */}
        {/* <label className="h4">Wrestler 2: </label>
        <input type="text" list="wrestler2List" onChange={onWrestler2Change} />
        <datalist id="wrestler2List">
          {personal_info.map((wrestler: any) => {
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
        </datalist> */}
        <div className="" style={{ width: "100%" }}></div>
        <label className="h4">Select Level: </label>
        <input type="number" onChange={onLevelChange} />
        <div className="" style={{ width: "100%" }}></div>
        <button className="btn btn-primary" onClick={getGradesForBothWrestlers}>
          Get grades for wrestlers
        </button>
        <button className="btn btn-primary ml-2" onClick={switchShowAllGrades}>
          Show/Hide grades for both wrestlers on all levels (MASTER VIEW)
        </button>

        {showAllGrades && (
          <>
            <GradingDashboardFor2WrestlersTwoPointO
              wrestler1UID={wrestler1Id}
              wrestler2UID={wrestler2Id}
              wrestler1FullName={wrestler1FullName}
              wrestler2FullName={wrestler2FullName}
            />

            <AllGradesAllLevelsFor2Wrestlers
              wrestler1Id={wrestler1Id}
              wrestler2Id={wrestler2Id}
              wrestler1FullName={wrestler1FullName}
              wrestler2FullName={wrestler2FullName}
              incrementUselessStateFunction={incrementUselessState}
            />
          </>
        )}
        <div className="divForLevel">
          {gradesForBothWrestlersOnCurrentLevel.map((move: any) => {
            return (
              <div key={`${move.id} ${move.wrestler_1_grade}`}>
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
                    className={classNames("my-1 p-2 ", {
                      gradeOf3: move.wrestler_1_grade === 3,
                      gradeOf2: move.wrestler_1_grade === 2,
                      gradeOf1: move.wrestler_1_grade === 1,
                      gradeOfIncorrect:
                        move.wrestler_1_grade > 3 || move.wrestler_1_grade < 0,
                      notGradeable: move.maximum_grade === 0,
                    })}
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
                      name={`${move.id}`}
                      onChange={onWrestler1GradeChange}
                      placeholder="0, 1, 2, or 3"
                    />
                    <div className="" style={{ width: "50%" }}></div>
                    <label>Notes: </label>
                    <textarea
                      rows={5}
                      cols={30}
                      name={`${move.id}`}
                      onChange={onWrestler1NoteChange}
                    ></textarea>
                    <div className="" style={{ width: "50%" }}></div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        submitGrade(
                          move.id,
                          Number(wrestler1Id),
                          Number(wrestler1NewGrade[move.id]),
                          wrestler1NewNote[move.id],
                          move.maximum_grade
                        );
                      }}
                    >
                      Update grade and notes for {move.wrestler_1_first_name}{" "}
                      {move.wrestler_1_last_name}
                    </button>
                  </div>
                  <div
                    className={classNames("my-1 p-2 ", {
                      gradeOf3: move.wrestler_2_grade === 3,
                      gradeOf2: move.wrestler_2_grade === 2,
                      gradeOf1: move.wrestler_2_grade === 1,
                      gradeOfIncorrect:
                        move.wrestler_2_grade > 3 || move.wrestler_2_grade < 0,
                      notGradeable: move.maximum_grade === 0,
                    })}
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
                      name={`${move.id}`}
                      onChange={onWrestler2GradeChange}
                      placeholder="0, 1, 2, or 3"
                    />
                    <div className="" style={{ width: "50%" }}></div>
                    <label>Notes: </label>
                    <textarea
                      rows={5}
                      cols={30}
                      name={`${move.id}`}
                      onChange={onWrestler2NoteChange}
                    ></textarea>
                    <div className="" style={{ width: "50%" }}></div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        submitGrade(
                          move.id,
                          Number(wrestler2Id),
                          Number(wrestler2NewGrade[move.id]),
                          wrestler2NewNote[move.id],
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
            );
          })}
        </div>
        <hr />
        <GradesOfXFor2Wrestlers
          wrestler1Id={wrestler1Id}
          wrestler2Id={wrestler2Id}
          incrementUselessStateFunction={incrementUselessState}
        />
        <hr />
        <MoveSearchFor2Wrestlers
          wrestler1Id={wrestler1Id}
          wrestler2Id={wrestler2Id}
          incrementUselessStateFunction={incrementUselessState}
        />
      </div>
    </>
  );
};

interface CoachesViewProps {}

export default CoachesView;
