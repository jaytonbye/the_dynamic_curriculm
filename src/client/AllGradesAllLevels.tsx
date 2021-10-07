import React from "react";
import WrestlerDashboard from "./WrestlerDashboard";
import { Link } from "react-router-dom";

export default function AllGradesAllLevels() {
  return (
    <>
      <Link to={`/wrestlersview`}> Go back to homepage</Link>
      <WrestlerDashboard />
      <div>
        This is the page where we will show all grades for everything. It's
        coming soon!
      </div>
    </>
  );
}
