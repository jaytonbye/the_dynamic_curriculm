import * as React from "react";

const CoachesView = (props: CoachesViewProps) => {
  const [personal_info, setPersonalInfo] = React.useState([]);
  const [wrestler1Id, setWrestler1Id] = React.useState({});
  const [wrestler2Id, setWrestler2Id] = React.useState({});
  const [moves, setMoves] = React.useState([]);
  const [level, setLevel] = React.useState(); //should I initialize this with null?
  const [
    gradesForWrestler1OnCurrentLevel,
    setGradesForWrestler1OnCurrentLevel,
  ] = React.useState([]);
  const [
    gradesForWrestler2OnCurrentLevel,
    setGradesForWrestler2OnCurrentLevel,
  ] = React.useState([]);
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

  //gets us all of the moves in all levels.
  React.useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((results) => {
        setMoves(results);
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
            <div className="row col-12 mt-5 d-flex justify-content-around">
              <div className="col-2">
                <h4>{move.name_of_video}</h4>
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
                <input type="number" value={move.wrestler_1_grade} />
                <label>Coaches' notes: </label>
                <textarea>{move.wrestler_1_movement_notes}</textarea>
                <button className="btn btn-primary">
                  Update Grade and notes for INSERT NAME
                </button>
              </div>
              <div className="col-2">
                <label>current grade: </label>
                <input type="number" value={move.wrestler_2_grade} />
                <label>Coaches' notes: </label>
                <textarea>{move.wrestler_2_movement_notes}</textarea>
                <button className="btn btn-primary">
                  Update Grade and notes for INSERT NAME
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

interface CoachesViewProps {}

export default CoachesView;
