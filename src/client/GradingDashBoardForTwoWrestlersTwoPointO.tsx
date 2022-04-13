import React from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import SubmitNoteForWrestler from "./SubmitNoteForWrestler";
import NotesFromCoachesForWrestlers from "./NotesFromCoachesForWrestlers";
import WayneCarlsGradingDashboardForTwoWrestlers from "./WayneCarlsGradingDashboardForTwoWrestlers";
import GradingDashboardMadeByLuke from "./GradingDashboardMadeByLuke";

interface IPersonalInfo {
  first_name: string;
  last_name: string;
}

function GradingDashboardFor2WrestlersTwpPointO(props: any) {
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
  const [allLoginsForWrestler1, setAllLoginsForWrestler1] = React.useState([]);
  const [allLoginsForWrestler2, setAllLoginsForWrestler2] = React.useState([]);

  let history = useHistory();
  let token = sessionStorage.getItem("token");
  let wrestler1UID = props.wrestler1UID;
  let wrestler2UID = props.wrestler2UID;

  React.useEffect(() => {
    fetch(`/api/successfulLogins/${wrestler1UID}`)
      .then((res) => res.json())
      .then((results) => {
        setAllLoginsForWrestler1(results);
      });
  }, []);

  React.useEffect(() => {
    fetch(`/api/successfulLogins/${wrestler2UID}`)
      .then((res) => res.json())
      .then((results) => {
        setAllLoginsForWrestler2(results);
      });
  }, []);

  React.useEffect(() => {
    fetch(`/api/personal_info/person/${wrestler1UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.length === 0) {
          alert("No personal info found for wrestler 1");
          history.push("/");
        } else {
          setPersonalInfoForWrestler1(results[0]);
        }
      });
  }, []);

  React.useEffect(() => {
    fetch(`/api/personal_info/person/${wrestler2UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.length === 0) {
          alert("No personal info found for wrestler 2");
          history.push("/");
        } else {
          setPersonalInfoForWrestler2(results[0]);
        }
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

  let logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("UID");
    history.push("/");
  };

  return (
    <div className="col-12">
      <div className="d-flex flex-wrap justify-content-around">
        <div className="card my-1 p-1 col-sm-12 col-md-6" style={{ border: "1.3px solid black" }}>
          <div className="card-body" style={{ flexGrow: 0 }}>
            <GradingDashboardMadeByLuke UID={wrestler1UID} />
            <div
              className="card-text"
              style={{ color: "black", fontSize: "smaller" }}
            >
              The previous 5 Logins for {props.wrestler1FullName} were:{" "}
              {allLoginsForWrestler1.map((login) => {
                return (
                  <p>
                    <Moment fromNow>{login.login_was_created_at}</Moment> -{" "}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <NotesFromCoachesForWrestlers UID={wrestler1UID} />
            <SubmitNoteForWrestler
              wrestlerID={wrestler1UID}
              wrestlerFullName={props.wrestler1FullName}
            />
          </div>
        </div>
        <div
          className="card my-1 p-1 col-sm-12 col-md-6"
          style={{ border: "1.3px solid #ff7824" }}
        >
          <div className="card-body" style={{ flexGrow: 0 }}>
            <h5 className="card-title">
              <strong>{/*{props.first_name} {personalInfo.last_name}*/}</strong>
            </h5>
            <GradingDashboardMadeByLuke UID={wrestler2UID} />
            <div
              className="card-text"
              style={{ color: "black", fontSize: "smaller" }}
            >
              The previous 5 Logins for {props.wrestler2FullName} were:{" "}
              {allLoginsForWrestler2.map((login) => {
                return (
                  <p>
                    <Moment fromNow>{login.login_was_created_at}</Moment> -{" "}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="mb-auto">
            <NotesFromCoachesForWrestlers UID={wrestler2UID} />
            <SubmitNoteForWrestler
              wrestlerID={wrestler2UID}
              wrestlerFullName={props.wrestler2FullName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradingDashboardFor2WrestlersTwpPointO;
