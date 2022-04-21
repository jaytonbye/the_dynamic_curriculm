import * as React from "react";
import { useState } from "react";

export default function PlayLessonPlan() {
  let [lessonPlanName, setLessonPlanName] = useState<string>();
  let [movesToBeAdded, setMovesToBeAdded] = useState<any>();
  let [durationTheWillBeDisplayed, setSurationTheWillBeDisplayed] =
    useState<any>();
  let [ordering, setOrdering] = useState<any>();
  let [allGrades, setAllGrades] = React.useState([]);
  let [searchedMoveId, setSearchedMoveId] = React.useState();
  let [searchedMoveObject, setSearchedMoveObject] = React.useState<any>({});

  let UID = localStorage.getItem("UID");
  let token = localStorage.getItem("token");

  let onMoveChange = (event: any) => {
    let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
    let moveIdAfterSlice = event.target.value.slice(
      whereToSliceFrom,
      event.target.value.length
    );

    setSearchedMoveId(moveIdAfterSlice);
  };

  React.useEffect(() => {
    //I don't know what I chose this variable name, I believe these are all of the moves, and not the grades...
    fetch(`/api/grades/allCurrentGradesForASingleWrestler/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setAllGrades(results);
      });
  }, []);

  React.useEffect(() => {
    for (let x = 0; x < allGrades.length; x++) {
      if (allGrades[x].id === Number(searchedMoveId)) {
        setSearchedMoveObject(allGrades[x]);
      }
    }
  }, [searchedMoveId]);

    return (
      <>
        <main className="container">
          <section className="mt-4 row justify-content-center">
            <form className="p-4 border rounded shadown form-group">
              <label>Lesson plan name: </label>
              <input
                className="mb-2 form-control"
                //   value={0}
                onChange={(e) => setLessonPlanName(e.target.value)}
              />

              <>
      <label className="h4">Search moves to add: </label>
      <input type="text" list="moveList" onChange={onMoveChange} />
      <datalist id="moveList">
        {allGrades.map((move) => {
          return (
            <option
              key={move.id}
              value={move.name_of_video + " -+- " + String(move.id)}
            ></option>
          );
        })}
      </datalist>

      <div className="container">
        <h5>{searchedMoveObject.name_of_video}</h5>
        <div className="col-12">
          <iframe
            width="95%"
            height="35%"
            src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_video}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </>

              <label>How long do you want to display the move: </label>
              <input
                type=""
                autoComplete=""
                className="mb-2 form-control"
                //   value={password}
                onChange={(e) => setSurationTheWillBeDisplayed(e.target.value)}
              />

              <label>ordering: </label>
              <input
                className="mb-2 form-control"
                //   value={0}
                onChange={(e) => setOrdering(e.target.value)}
              />

              <div className="d-flex justify-content-start flex-wrap align-items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log({
                      movesToBeAdded,
                      durationTheWillBeDisplayed,
                      lessonPlanName,
                      ordering,
                    });
                  }}
                  className="btn btn-primary ml-2 mt-2"
                >
                  Login
                </button>
              </div>
            </form>
          </section>
        </main>
      </>
    );

}
