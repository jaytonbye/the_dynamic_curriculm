import React from "react";

function GradesOfX() {
  const [movesAndGrades, setMovesAndGrades] = React.useState([]);
  let token = sessionStorage.getItem("token");
  let UID = sessionStorage.getItem("UID");

  const onGradeChange = (event: any) => {
    let grade = event.target.value;
    fetch(
      `/api/grades/allSpecificCurrentGradesForASingleWrestler/${UID}&${grade}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((results) => {
        setMovesAndGrades(results);
      });
  };
  return (
    <>
      <label className="h4">
        Show me all of the moves where I have a grade of (0, 1, 2, or 3):{" "}
      </label>
      <input
        type="number"
        onChange={onGradeChange}
        placeholder="insert number"
      />
      <div className="container">
        <div className="col-12">
          <div>
            {movesAndGrades.map((move) => {
              return (
                <div key={move.id}>
                  <hr />
                  <h5>
                    {move.number_for_ordering}. {move.name_of_video}
                  </h5>
                  <div>
                    <iframe
                      width="95%"
                      height="35%"
                      src={`https://www.youtube.com/embed/${move.url_to_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                  <div>
                    <iframe
                      width="95%"
                      height="35%"
                      src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                  <h5>Your grade here: {move.grade}</h5>
                  <h5>Coaches' notes: {move.movement_notes}</h5>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default GradesOfX;
