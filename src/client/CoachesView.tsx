import * as React from "react";
import WrestlersView from "./WrestlersView";

const CoachesView = (props: CoachesViewProps) => {
  const [personal_info, setPersonalInfo] = React.useState([]);
  const [wrestler1, setWrestler1] = React.useState("");
  const [wrestler2, setWrestler2] = React.useState("");
  const [wrestler1Details, setWrestler1Details] = React.useState({});
  const [wrestler2Details, setWrestlerDetails] = React.useState({});
  const [moves, setMoves] = React.useState([]);
  const [level, setLevel] = React.useState();

  const onWrestler1Change = (event: any) => {
    setWrestler1(event.target.value);
  };
  const onWrestler2Change = (event: any) => {
    setWrestler2(event.target.value);
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

  return (
    <>
      <h1>coaches' view</h1>
      <label>Wrestler 1: </label>
      <input type="text" list="wrestler1List" onChange={onWrestler1Change} />
      <datalist id="wrestler1List">
        {personal_info.map((wrestler) => {
          return (
            <option
              value={wrestler.first_name + " " + wrestler.last_name}
            ></option>
          );
        })}
      </datalist>

      <label>Wrestler 2: </label>
      <input type="text" list="wrestler2List" onChange={onWrestler2Change} />
      <datalist id="wrestler2List">
        {personal_info.map((wrestler) => {
          return (
            <option
              value={wrestler.first_name + " " + wrestler.last_name}
            ></option>
          );
        })}
      </datalist>

      <label>Select Level: </label>
      <input type="number" />
      <button className="btn btn-primary">Get Wrestlers</button>
      <div className="divForLevel">
        <h1 className="text text-center">Level X</h1>
        <div className="row col-12 mt-5 d-flex justify-content-around">
          <div className="col-2">
            <h3>Move Name:</h3>
            <h4>switch</h4>
          </div>
          <div className="col-2">
            <h3>Video:</h3>
            <h4>switch vid</h4>
          </div>
          <div className="col-2">
            <h3>Looped Video:</h3>
            <h4>looped switch video</h4>
          </div>
          <div className="col-2">
            <h3>Wrestler 1's Name</h3>
            <label>Current Grade: </label>
            <input type="number" />
            <button>submit new grade</button>
          </div>
          <div className="col-2">
            <h3>Wrestler 2s Name</h3>
            <label>Current Grade: </label>
            <input type="number" />
            <button>submit new grade</button>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

interface CoachesViewProps {}

export default CoachesView;
