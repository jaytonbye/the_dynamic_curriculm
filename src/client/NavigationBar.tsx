import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function NavigationBar() {
  let history = useHistory();
  let logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("UID");
    history.push("/");
  };

  let goToUnitVideosPage = () => {
    history.push("/UnitVideosPage");
  };
  let goToTestPage = () => {
    history.push("/Tests");
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to={`/coachesview`} className="btn btn-outline-primary">
            I'm a coach...
          </Link>
          <button
            className="btn btn-outline-primary"
            onClick={goToUnitVideosPage}
          >
            Unit Videos (for practice)
          </button>
          <button className="btn btn-outline-primary" onClick={goToTestPage}>
            Tests
          </button>
          <button className="btn btn-outline-success" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
