import React from "react";

function MoveSearch() {
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
      <label className="h4">Search for a specific move: </label>
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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>
        <div className="col-12">
          <iframe
            width="95%"
            height="35%"
            src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_looped_video}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <h5>
          <strong>Your grade here:</strong> {searchedMoveObject.grade}
        </h5>
        <h5>
          <strong>Coach's notes:</strong>
          {searchedMoveObject.movements_notes}
        </h5>
      </div>
    </>
  );
}

export default MoveSearch;
