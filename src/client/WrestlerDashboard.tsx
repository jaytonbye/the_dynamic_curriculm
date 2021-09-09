import React from "react";
import { Link, useHistory } from "react-router-dom";

interface IPersonalInfo {
  first_name: string;
  last_name: string;
}

function WrestlerDashboard() {
  const [personalInfo, setPersonalInfo] = React.useState<IPersonalInfo>({
    first_name: "wrestler's first name",
    last_name: "wrestler's last name",
  });
  const [grades, setGrades] = React.useState([]);
  const [totalPoints, setTotalPoints] = React.useState(0);
  const [totalPointsAvailable, setTotalPointsAvailable] = React.useState(0);
  const [shirtColor, setShirtColor] = React.useState("Black");
  const [nextShirtColor, setNextShirtColor] = React.useState("Blue");
  const [
    pointsNeededForNextShirtColor,
    setPointsNeededForNextShirtColor,
  ] = React.useState(0);

  let history = useHistory();
  let UID = sessionStorage.getItem("UID");
  let token = sessionStorage.getItem("token");

  React.useEffect(() => {
    fetch(`/api/personal_info/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setPersonalInfo(results[0]);
      });
  }, []);

  React.useEffect(() => {
    fetch(`/api/grades/allCurrentGradesForASingleWrestler/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setGrades(results);
      });
  }, []);

  // We wait for the grades api call, and then we calculate the total points the wrestler has earned and the total points available. The waiting is handled by the dependency array.
  React.useEffect(() => {
    let total = 0;
    for (let x = 0; x < grades.length; x++) {
      total = total + grades[x].grade;
    }
    setTotalPoints(total);
    setTotalPointsAvailable(grades.length * 3);
  }, [grades]);

  React.useEffect(() => {
    if (totalPointsAvailable === 0) {
      return;
    }

    let blue = Math.ceil(totalPointsAvailable * 0.14);
    let grey = Math.ceil(totalPointsAvailable * 0.34);
    let red = Math.ceil(totalPointsAvailable * 0.46);
    let purple = Math.ceil(totalPointsAvailable * 0.61);
    let lightBlue = Math.ceil(totalPointsAvailable * 0.79);
    let orange = Math.ceil(totalPointsAvailable * 0.97);

    if (totalPoints >= orange) {
      setShirtColor("Orange");
      setNextShirtColor(
        "You've earned the Orange shirt! We do not give those out easily, it takes lots of hard work, dedication, and perseverance to earn an orange shirt. Congratulations on completing the Dynamic Wrestling Curriculum!"
      );
    } else if (totalPoints >= lightBlue) {
      setShirtColor("Light Blue");
      setNextShirtColor("Orange");
    } else if (totalPoints >= purple) {
      setShirtColor("Purple");
      setNextShirtColor("Light Blue");
    } else if (totalPoints >= red) {
      setShirtColor("Red");
      setNextShirtColor("Purple");
    } else if (totalPoints >= grey) {
      setShirtColor("Grey");
      setNextShirtColor("Red");
    } else if (totalPoints >= blue) {
      setShirtColor("Blue");
      setNextShirtColor("Grey");
    }
  }, [totalPointsAvailable, grades]);

  React.useEffect(() => {
    let blue = Math.ceil(totalPointsAvailable * 0.14);
    let grey = Math.ceil(totalPointsAvailable * 0.34);
    let red = Math.ceil(totalPointsAvailable * 0.46);
    let purple = Math.ceil(totalPointsAvailable * 0.61);
    let lightBlue = Math.ceil(totalPointsAvailable * 0.79);
    let orange = Math.ceil(totalPointsAvailable * 0.97);

    if (shirtColor === "Light Blue") {
      setPointsNeededForNextShirtColor(orange - totalPoints);
    } else if (shirtColor === "Purple") {
      setPointsNeededForNextShirtColor(lightBlue - totalPoints);
    } else if (shirtColor === "Red") {
      setPointsNeededForNextShirtColor(purple - totalPoints);
    } else if (shirtColor === "Grey") {
      setPointsNeededForNextShirtColor(red - totalPoints);
    } else if (shirtColor === "Blue") {
      setPointsNeededForNextShirtColor(grey - totalPoints);
    } else if (shirtColor === "Black") {
      setPointsNeededForNextShirtColor(blue - totalPoints);
    }
  }, [shirtColor, grades, totalPointsAvailable]);

  let logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("UID");
    history.push("/");
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to={`/coachesview`}>
            <p>I'm a coach...</p>
          </Link>

          <button className="btn btn-outline-success" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="card">
        <h5 className="card-header">
          Wrestler Dashboard - {personalInfo.first_name}{" "}
          {personalInfo.last_name}
        </h5>
        <div className="card-body">
          <h5 className="card-title">
            <strong>
              {/*{personalInfo.first_name} {personalInfo.last_name}*/}
            </strong>
          </h5>
          <p className="card-text">
            Current Shirt Color: <strong>{shirtColor}</strong>
          </p>
          <p className="card-text">
            You have currently earned <strong>{totalPoints}</strong> out of{" "}
            <strong>{totalPointsAvailable}</strong> total available points.
          </p>
          <p className="card-text">
            Next shirt color: <strong>{nextShirtColor}</strong>
          </p>
          <p className="card-text">
            Points till next shirt:{" "}
            <strong>{pointsNeededForNextShirtColor}</strong>
          </p>
          <p>Points required for each shirt:</p>
          <div className="row">
            <div className="d-flex justify-content-around">
              <h4
                className="shirt-color-text-resizer"
                style={{ color: "black", fontSize: "smaller" }}
              >
                {" "}
                Black shirt <br></br> 0
              </h4>
              <h4
                className="shirt-color-text-resizer"
                style={{ color: "blue", fontSize: "smaller" }}
              >
                {" "}
                Blue Shirt <br></br> {Math.ceil(totalPointsAvailable * 0.14)}
              </h4>
              <h4
                className="shirt-color-text-resizer"
                style={{ color: "grey", fontSize: "smaller" }}
              >
                {" "}
                Grey Shirt <br></br> {Math.ceil(totalPointsAvailable * 0.34)}
              </h4>
              <h4
                className="shirt-color-text-resizer"
                style={{ color: "red", fontSize: "smaller" }}
              >
                {" "}
                Red Shirt <br></br> {Math.ceil(totalPointsAvailable * 0.46)}
              </h4>
              <h4
                className="shirt-color-text-resizer"
                style={{ color: "purple", fontSize: "smaller" }}
              >
                {" "}
                Purple Shirt <br></br> {Math.ceil(totalPointsAvailable * 0.61)}
              </h4>
              <h4
                className="shirt-color-text-resizer"
                style={{ color: "aqua", fontSize: "smaller" }}
              >
                {" "}
                Light Blue Shirt <br></br>{" "}
                {Math.ceil(totalPointsAvailable * 0.79)}
              </h4>
              <h4
                className="shirt-color-text-resizer"
                style={{ color: "orange", fontSize: "smaller" }}
              >
                Orange Shirt <br></br> {Math.ceil(totalPointsAvailable * 0.97)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WrestlerDashboard;
