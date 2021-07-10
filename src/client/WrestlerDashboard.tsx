import React from "react";
import { Link, useHistory } from "react-router-dom";

interface IPersonalInfo {
  first_name: string;
  last_name: string;
}

function WrestlerDashboard() {
  const [personalInfo, setPersonalInfo] = React.useState<IPersonalInfo>({});
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
          <Link to={"/ProfilePage"}>
            <p>Update my profile</p>
          </Link>
          <button className="btn btn-outline-success" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="card">
        <h5 className="card-header">Wrestler Dashboard</h5>
        <div className="card-body">
          <h5 className="card-title">
            {personalInfo.first_name} {personalInfo.last_name}
          </h5>
          <p className="card-text">Current Shirt Color:</p>
          <p className="card-text">Total Points:</p>
          <p className="card-text">Points till next shirt:</p>
          <p className="card-text">Notes from the coaches:</p>
        </div>
      </div>
      ;
    </>
  );
}

export default WrestlerDashboard;
