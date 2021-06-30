import React from "react";

function WrestlerDashboard(props) {
  return (
    <>
      <div className="card">
        <h5 className="card-header">Wrestler Dashboard</h5>
        <div className="card-body">
          <h5 className="card-title">Name of wrestler: </h5>
          <p className="card-text">Current Shirt Color:</p>
          <p className="card-text">Total Points:</p>
          <p className="card-text">Points till next shirt:</p>
        </div>
      </div>
    </>
  );
}

export default WrestlerDashboard;
