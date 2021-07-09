import React from "react";

function GradesOfX() {
  const [movesAndGrades, setMovesAndGrades] = React.useState([]);
  let token = localStorage.getItem("token");

  const onGradeChange = (event: any) => {
    let grade = event.target.value;
    fetch(
      `http://localhost:3000/api/grades/allSpecificCurrentGradesForASingleWrestler/3&${grade}`,
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
        Show me all of the moves where I have a grade of:{" "}
      </label>
      <input
        type="number"
        onChange={onGradeChange}
        placeholder="insert number"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Move</th>
            <th>Video</th>
            <th>Looped Video</th>
            <th>Points earned</th>
            <th>Points available</th>
          </tr>
        </thead>
        <tbody>
          {movesAndGrades.map((move) => {
            return (
              <tr>
                <td>
                  {move.number_for_ordering}. {move.name_of_video}
                </td>
                <td>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${move.url_to_video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </td>
                <td>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </td>
                <td>Your grade here: {move.grade}</td>
                <td>Coaches' notes: {move.movement_notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default GradesOfX;
