import React from "react";

function WrestlerDashboard() {
  const [personalInfo, setPersonalInfo] = React.useState([]);
  let UID = sessionStorage.getItem("UID");
  let token = sessionStorage.getItem("token");

  React.useEffect(() => {
    fetch(`/api/personal_info/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setPersonalInfo(results);
      });
  }, []);

  return (
    <>
      <div className="card">
        <h5 className="card-header">Wrestler Dashboard</h5>
        <div className="card-body">
          <h5 className="card-title">hey{personalInfo.first_name}</h5>
          <p className="card-text">Current Shirt Color:</p>
          <p className="card-text">Total Points:</p>
          <p className="card-text">Points till next shirt:</p>
        </div>
      </div>
      ;
    </>
  );
}

export default WrestlerDashboard;
