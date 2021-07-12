import React from "react";

function MoveSearch() {
  let [allGrades, setAllGrades] = React.useState([]);
  let [searchedMoveId, setSearchedMoveId] = React.useState();
  let [searchedMoveObject, setSearchedMoveObject] = React.useState({});

  let UID = sessionStorage.getItem("UID");
  let token = sessionStorage.getItem("token");

  let onMoveChange = (event) => {
    setSearchedMoveId(event.target.value);
  };

  React.useEffect(() => {
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
      <label className="h4">Search for a specific move: </label>
      <input type="text" list="moveList" onChange={onMoveChange} />
      <datalist id="moveList">
        {allGrades.map((move) => {
          return <option value={move.id}>{move.name_of_video}</option>;
        })}
      </datalist>
      <hr />
      <tr>
        <td>{searchedMoveObject.name_of_video}</td>
        <td>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_video}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </td>
        <td>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_looped_video}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </td>
        <td>
          <strong>Your grade here:</strong> {searchedMoveObject.grade}
        </td>
        <td>
          <strong>Coach's notes:</strong>
          {searchedMoveObject.movements_notes}
        </td>
      </tr>
    </>
  );
}

export default MoveSearch;