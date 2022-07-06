import React from "react";
import DropDownForMovesAndWrestlers from "./DropDownForMovesAndWrestlers"

function MoveSearch() {
  ///DROPDOWN START 1/3
  let [displayDropDown, setDisplayDropDown] = React.useState(false);
  let [dropDownInputValue, setDropDownInputValue] = React.useState("");
  let wrapperRef = React.useRef(null); //this closes autocomplete list when mouse clicks off of it
  ///DROP END
  let [allGrades, setAllGrades] = React.useState([]);
  let [searchedMoveId, setSearchedMoveId] = React.useState();
  let [searchedMoveObject, setSearchedMoveObject] = React.useState<any>({});

  let UID = localStorage.getItem("UID");
  let token = localStorage.getItem("token");

  // let onMoveChange = (event: any) => {
  //   let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
  //   let moveIdAfterSlice = event.target.value.slice(
  //     whereToSliceFrom,
  //     event.target.value.length
  //   );

  //   setSearchedMoveId(moveIdAfterSlice);
  // };

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

  //DROPDOWN START 2/3
  React.useEffect(() => {
    for (let x = 0; x < allGrades.length; x++) {
      if (allGrades[x].id === Number(searchedMoveId)) {
        setSearchedMoveObject(allGrades[x]);
      }
    }
  }, [searchedMoveId]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickedOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickedOutsideDropdown);
    };
  }, []);

  let handleClickedOutsideDropdown = (e: any) => {
    let { current: wrap }: any = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplayDropDown(false);
    }
  };
  //DROPDOWN END

  return (
    <>
      {/* ///DROPDOWN START 3/3 */}
      <div className="d-flex flex wrap justify-content-center">
        <div
          style={{ width: "400px" }}
          className="d-flex flex-wrap justify-content-center align-items-center"
        >
          <label className="h4 ">Search a move:</label>
          <div ref={wrapperRef}>
            <DropDownForMovesAndWrestlers
              // first select if drop is for moves or people
              isMovesList={true}
              isPersonList={false}
              // fill in proper values for dropdown
              dropDownInputValue={dropDownInputValue}
              setDropDownInputValue={setDropDownInputValue}
              displayDropDown={displayDropDown}
              setDisplayDropDown={setDisplayDropDown}
              // If for moves fill proper values. else make these null
              videosByTenant={allGrades}
              setSearchedMoveId={setSearchedMoveId}
              // If for people fill proper values. else make these null
              personal_info={null}
              setWrestlerId={null}
            />
          </div>
        </div>
      </div>
      {/* DROPDOWN END  */}
      {/* <label className="h4">Search for a specific move: </label>
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
      </datalist> */}

      <div className="container">
        <h5>{searchedMoveObject.name_of_video}</h5>
        <div className="col-12">
          <iframe
            width="95%"
            height="35%"
            src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_video}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
        <div className="col-12">
          <iframe
            width="95%"
            height="35%"
            src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_looped_video}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h5>
          <strong>Your grade here:</strong>{" "}
          {searchedMoveObject.grade === 3
            ? "★★★"
            : searchedMoveObject.grade === 2
              ? "★★"
              : searchedMoveObject.grade === 1
                ? "★"
                : searchedMoveObject.grade === 0
                  ? "0"
                  : "Not Graded"}
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
