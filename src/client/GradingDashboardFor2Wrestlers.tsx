import React from "react";
import { Link, useHistory } from "react-router-dom";

interface IPersonalInfo {
  first_name: string;
  last_name: string;
}

function GradingDashboardFor2Wrestlers(props: any) {
  const [
    personalInfoForWrestler1,
    setPersonalInfoForWrestler1,
  ] = React.useState<IPersonalInfo>({
    first_name: "wrestler 1's first name",
    last_name: "wrestler 1's last name",
  });
  const [
    personalInfoForWrestler2,
    setPersonalInfoForWrestler2,
  ] = React.useState<IPersonalInfo>({
    first_name: "wrestler 2's first name",
    last_name: "wrestler 2's last name",
  });
  const [gradesForWrestler1, setGradesForWrestler1] = React.useState([]);
  const [gradesForWrestler2, setGradesForWrestler2] = React.useState([]);
  const [totalPointsForWrestler1, setTotalPointsForWrestler1] = React.useState(
    0
  );
  const [
    totalPointsAvailableForWrestler1,
    setTotalPointsAvailableForWrestler1,
  ] = React.useState(0);
  const [totalPointsForWrestler2, setTotalPointsForWrestler2] = React.useState(
    0
  );
  const [
    totalPointsAvailableForWrestler2,
    setTotalPointsAvailableForWrestler2,
  ] = React.useState(0);
  const [shirtColorForWrestler1, setShirtColorForWrestler1] = React.useState(
    "Black"
  );
  const [shirtColorForWrestler2, setShirtColorForWrestler2] = React.useState(
    "Black"
  );
  const [
    nextShirtColorForWrestler1,
    setNextShirtColorForWrestler1,
  ] = React.useState("Blue");
  const [
    nextShirtColorForWrestler2,
    setNextShirtColorForWrestler2,
  ] = React.useState("Blue");
  const [
    pointsNeededForNextShirtColorForWrestler1,
    setPointsNeededForNextShirtColorForWrestler1,
  ] = React.useState(0);
  const [
    pointsNeededForNextShirtColorForWrestler2,
    setPointsNeededForNextShirtColorForWrestler2,
  ] = React.useState(0);

  let history = useHistory();
  let UID = sessionStorage.getItem("UID");
  let token = sessionStorage.getItem("token");
  let wrestler1UID = props.wrestler1UID;
  let wrestler2UID = props.wrestler2UID;

  React.useEffect(() => {
    fetch(`/api/personal_info/${wrestler1UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setPersonalInfoForWrestler1(results[0]);
      });
  }, []);

  React.useEffect(() => {
    fetch(`/api/personal_info/${wrestler2UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setPersonalInfoForWrestler2(results[0]);
      });
  }, []);

  React.useEffect(() => {
    if (props.wrestler1UID) {
      fetch(
        `/api/grades/allCurrentGradesForASingleWrestler/${props.wrestler1UID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((results) => {
          setGradesForWrestler1(results);
        });
    }
  }, [props.wrestler1UID]);

  React.useEffect(() => {
    if (props.wrestler2UID) {
      fetch(
        `/api/grades/allCurrentGradesForASingleWrestler/${props.wrestler2UID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((results) => {
          setGradesForWrestler2(results);
        });
    }
  }, [props.wrestler2UID]);

  // We wait for the grades api call, and then we calculate the total points the wrestler has earned and the total points available. The waiting is handled by the dependency array.
  React.useEffect(() => {
    let total = 0;
    for (let x = 0; x < gradesForWrestler1.length; x++) {
      total = total + gradesForWrestler1[x].grade;
    }
    setTotalPointsForWrestler1(total);
    setTotalPointsAvailableForWrestler1(gradesForWrestler1.length * 3);
  }, [gradesForWrestler1]);

  React.useEffect(() => {
    let total = 0;
    for (let x = 0; x < gradesForWrestler2.length; x++) {
      total = total + gradesForWrestler2[x].grade;
    }
    setTotalPointsForWrestler2(total);
    setTotalPointsAvailableForWrestler2(gradesForWrestler1.length * 3);
  }, [gradesForWrestler2]);

  //up to here:
  React.useEffect(() => {
    if (totalPointsAvailableForWrestler1 === 0) {
      return;
    }

    let blue = Math.ceil(totalPointsAvailableForWrestler1 * 0.14);
    let grey = Math.ceil(totalPointsAvailableForWrestler1 * 0.34);
    let red = Math.ceil(totalPointsAvailableForWrestler1 * 0.46);
    let purple = Math.ceil(totalPointsAvailableForWrestler1 * 0.61);
    let lightBlue = Math.ceil(totalPointsAvailableForWrestler1 * 0.79);
    let orange = Math.ceil(totalPointsAvailableForWrestler1 * 0.97);

    if (totalPointsForWrestler1 >= orange) {
      setShirtColorForWrestler1("Orange");
      setNextShirtColorForWrestler1(
        "You've earned the Orange shirt! We do not give those out easily, it takes lots of hard work, dedication, and perseverance to earn an orange shirt. Congratulations on completing the Dynamic Wrestling Curriculum!"
      );
    } else if (totalPointsForWrestler1 >= lightBlue) {
      setShirtColorForWrestler1("Light Blue");
      setNextShirtColorForWrestler1("Orange");
    } else if (totalPointsForWrestler1 >= purple) {
      setShirtColorForWrestler1("Purple");
      setNextShirtColorForWrestler1("Light Blue");
    } else if (totalPointsForWrestler1 >= red) {
      setShirtColorForWrestler1("Red");
      setNextShirtColorForWrestler1("Purple");
    } else if (totalPointsForWrestler1 >= grey) {
      setShirtColorForWrestler1("Grey");
      setNextShirtColorForWrestler1("Red");
    } else if (totalPointsForWrestler1 >= blue) {
      setShirtColorForWrestler1("Blue");
      setNextShirtColorForWrestler1("Grey");
    }
  }, [totalPointsAvailableForWrestler1, gradesForWrestler1]);

  React.useEffect(() => {
    if (totalPointsAvailableForWrestler2 === 0) {
      return;
    }

    let blue = Math.ceil(totalPointsAvailableForWrestler2 * 0.14);
    let grey = Math.ceil(totalPointsAvailableForWrestler2 * 0.34);
    let red = Math.ceil(totalPointsAvailableForWrestler2 * 0.46);
    let purple = Math.ceil(totalPointsAvailableForWrestler2 * 0.61);
    let lightBlue = Math.ceil(totalPointsAvailableForWrestler2 * 0.79);
    let orange = Math.ceil(totalPointsAvailableForWrestler2 * 0.97);

    if (totalPointsForWrestler2 >= orange) {
      setShirtColorForWrestler2("Orange");
      setNextShirtColorForWrestler2(
        "You've earned the Orange shirt! We do not give those out easily, it takes lots of hard work, dedication, and perseverance to earn an orange shirt. Congratulations on completing the Dynamic Wrestling Curriculum!"
      );
    } else if (totalPointsForWrestler2 >= lightBlue) {
      setShirtColorForWrestler2("Light Blue");
      setNextShirtColorForWrestler2("Orange");
    } else if (totalPointsForWrestler2 >= purple) {
      setShirtColorForWrestler2("Purple");
      setNextShirtColorForWrestler2("Light Blue");
    } else if (totalPointsForWrestler2 >= red) {
      setShirtColorForWrestler2("Red");
      setNextShirtColorForWrestler2("Purple");
    } else if (totalPointsForWrestler2 >= grey) {
      setShirtColorForWrestler2("Grey");
      setNextShirtColorForWrestler2("Red");
    } else if (totalPointsForWrestler2 >= blue) {
      setShirtColorForWrestler2("Blue");
      setNextShirtColorForWrestler2("Grey");
    }
  }, [totalPointsAvailableForWrestler2, gradesForWrestler2]);

  React.useEffect(() => {
    let blue = Math.ceil(totalPointsAvailableForWrestler1 * 0.14);
    let grey = Math.ceil(totalPointsAvailableForWrestler1 * 0.34);
    let red = Math.ceil(totalPointsAvailableForWrestler1 * 0.46);
    let purple = Math.ceil(totalPointsAvailableForWrestler1 * 0.61);
    let lightBlue = Math.ceil(totalPointsAvailableForWrestler1 * 0.79);
    let orange = Math.ceil(totalPointsAvailableForWrestler1 * 0.97);

    if (shirtColorForWrestler1 === "Light Blue") {
      setPointsNeededForNextShirtColorForWrestler1(
        orange - totalPointsForWrestler1
      );
    } else if (shirtColorForWrestler1 === "Purple") {
      setPointsNeededForNextShirtColorForWrestler1(
        lightBlue - totalPointsForWrestler1
      );
    } else if (shirtColorForWrestler1 === "Red") {
      setPointsNeededForNextShirtColorForWrestler1(
        purple - totalPointsForWrestler1
      );
    } else if (shirtColorForWrestler1 === "Grey") {
      setPointsNeededForNextShirtColorForWrestler1(
        red - totalPointsForWrestler1
      );
    } else if (shirtColorForWrestler1 === "Blue") {
      setPointsNeededForNextShirtColorForWrestler1(
        grey - totalPointsForWrestler1
      );
    } else if (shirtColorForWrestler1 === "Black") {
      setPointsNeededForNextShirtColorForWrestler1(
        blue - totalPointsForWrestler1
      );
    }
  }, [
    shirtColorForWrestler1,
    gradesForWrestler1,
    totalPointsAvailableForWrestler1,
  ]);

  React.useEffect(() => {
    let blue = Math.ceil(totalPointsAvailableForWrestler2 * 0.14);
    let grey = Math.ceil(totalPointsAvailableForWrestler2 * 0.34);
    let red = Math.ceil(totalPointsAvailableForWrestler2 * 0.46);
    let purple = Math.ceil(totalPointsAvailableForWrestler2 * 0.61);
    let lightBlue = Math.ceil(totalPointsAvailableForWrestler2 * 0.79);
    let orange = Math.ceil(totalPointsAvailableForWrestler2 * 0.97);

    if (shirtColorForWrestler2 === "Light Blue") {
      setPointsNeededForNextShirtColorForWrestler2(
        orange - totalPointsForWrestler2
      );
    } else if (shirtColorForWrestler2 === "Purple") {
      setPointsNeededForNextShirtColorForWrestler2(
        lightBlue - totalPointsForWrestler2
      );
    } else if (shirtColorForWrestler2 === "Red") {
      setPointsNeededForNextShirtColorForWrestler2(
        purple - totalPointsForWrestler2
      );
    } else if (shirtColorForWrestler2 === "Grey") {
      setPointsNeededForNextShirtColorForWrestler2(
        red - totalPointsForWrestler2
      );
    } else if (shirtColorForWrestler2 === "Blue") {
      setPointsNeededForNextShirtColorForWrestler2(
        grey - totalPointsForWrestler2
      );
    } else if (shirtColorForWrestler2 === "Black") {
      setPointsNeededForNextShirtColorForWrestler2(
        blue - totalPointsForWrestler2
      );
    }
  }, [
    shirtColorForWrestler2,
    gradesForWrestler2,
    totalPointsAvailableForWrestler2,
  ]);

  let logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("UID");
    history.push("/");
  };
  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        <div className="card">
          <h5 className="card-header">
            Wrestler Dashboard - {personalInfoForWrestler1.first_name}{" "}
            {personalInfoForWrestler1.last_name}
          </h5>
          <div className="card-body">
            <h5 className="card-title">
              <strong>{/*{props.first_name} {personalInfo.last_name}*/}</strong>
            </h5>
            <p className="card-text">
              Current Shirt Color: <strong>{shirtColorForWrestler1}</strong>
            </p>
            <p className="card-text">
              You have currently earned{" "}
              <strong>{totalPointsForWrestler1}</strong> out of{" "}
              <strong>{totalPointsAvailableForWrestler1}</strong> total
              available points.
            </p>
            <p className="card-text">
              Next shirt color: <strong>{nextShirtColorForWrestler1}</strong>
            </p>
            <p className="card-text">
              Points till next shirt:{" "}
              <strong>{pointsNeededForNextShirtColorForWrestler1}</strong>
            </p>
            <p>Points required for each shirt:</p>

            <p
              className="card-text"
              style={{ color: "black", fontSize: "smaller" }}
            >
              {" "}
              Black shirt - 0
            </p>
            <p
              className="card-text"
              style={{ color: "blue", fontSize: "smaller" }}
            >
              {" "}
              Blue Shirt - {Math.ceil(totalPointsAvailableForWrestler1 * 0.14)}
            </p>
            <p
              className="card-text"
              style={{ color: "grey", fontSize: "smaller" }}
            >
              {" "}
              Grey Shirt - {Math.ceil(totalPointsAvailableForWrestler1 * 0.34)}
            </p>
            <p
              className="card-text"
              style={{ color: "red", fontSize: "smaller" }}
            >
              {" "}
              Red Shirt - {Math.ceil(totalPointsAvailableForWrestler1 * 0.46)}
            </p>
            <p
              className="card-text"
              style={{ color: "purple", fontSize: "smaller" }}
            >
              {" "}
              Purple Shirt -{" "}
              {Math.ceil(totalPointsAvailableForWrestler1 * 0.61)}
            </p>
            <p
              className="card-text"
              style={{ color: "aqua", fontSize: "smaller" }}
            >
              {" "}
              Light Blue Shirt -{" "}
              {Math.ceil(totalPointsAvailableForWrestler1 * 0.79)}
            </p>
            <p
              className="card-text"
              style={{ color: "orange", fontSize: "smaller" }}
            >
              Orange Shirt -{" "}
              {Math.ceil(totalPointsAvailableForWrestler1 * 0.97)}
            </p>
          </div>
          <h5 className="card-header">
            Wrestler Dashboard - {personalInfoForWrestler1.first_name}{" "}
            {personalInfoForWrestler1.last_name}
          </h5>
        </div>
        <div className="card">
          <h5 className="card-header">
            Wrestler Dashboard - {personalInfoForWrestler2.first_name}{" "}
            {personalInfoForWrestler1.last_name}
          </h5>
          <div className="card-body">
            <h5 className="card-title">
              <strong>{/*{props.first_name} {personalInfo.last_name}*/}</strong>
            </h5>
            <p className="card-text">
              Current Shirt Color: <strong>{shirtColorForWrestler2}</strong>
            </p>
            <p className="card-text">
              You have currently earned{" "}
              <strong>{totalPointsForWrestler2}</strong> out of{" "}
              <strong>{totalPointsAvailableForWrestler2}</strong> total
              available points.
            </p>
            <p className="card-text">
              Next shirt color: <strong>{nextShirtColorForWrestler2}</strong>
            </p>
            <p className="card-text">
              Points till next shirt:{" "}
              <strong>{pointsNeededForNextShirtColorForWrestler2}</strong>
            </p>
            <p>Points required for each shirt:</p>

            <p
              className="card-text"
              style={{ color: "black", fontSize: "smaller" }}
            >
              {" "}
              Black shirt - 0
            </p>
            <p
              className="card-text"
              style={{ color: "blue", fontSize: "smaller" }}
            >
              {" "}
              Blue Shirt - {Math.ceil(totalPointsAvailableForWrestler2 * 0.14)}
            </p>
            <p
              className="card-text"
              style={{ color: "grey", fontSize: "smaller" }}
            >
              {" "}
              Grey Shirt - {Math.ceil(totalPointsAvailableForWrestler2 * 0.34)}
            </p>
            <p
              className="card-text"
              style={{ color: "red", fontSize: "smaller" }}
            >
              {" "}
              Red Shirt - {Math.ceil(totalPointsAvailableForWrestler2 * 0.46)}
            </p>
            <p
              className="card-text"
              style={{ color: "purple", fontSize: "smaller" }}
            >
              {" "}
              Purple Shirt -{" "}
              {Math.ceil(totalPointsAvailableForWrestler2 * 0.61)}
            </p>
            <p
              className="card-text"
              style={{ color: "aqua", fontSize: "smaller" }}
            >
              {" "}
              Light Blue Shirt -{" "}
              {Math.ceil(totalPointsAvailableForWrestler2 * 0.79)}
            </p>
            <p
              className="card-text"
              style={{ color: "orange", fontSize: "smaller" }}
            >
              Orange Shirt -{" "}
              {Math.ceil(totalPointsAvailableForWrestler2 * 0.97)}
            </p>
          </div>
          <h5 className="card-header">
            Wrestler Dashboard - {personalInfoForWrestler2.first_name}{" "}
            {personalInfoForWrestler1.last_name}
          </h5>
        </div>
      </div>
    </>
  );
}

export default GradingDashboardFor2Wrestlers;
