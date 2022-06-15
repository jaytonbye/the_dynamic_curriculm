import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function NavigationBar() {
  const [counter, setCounter] = React.useState(0);
  const [userRole, setUserRole] = React.useState("");

  let UID = Number(localStorage.getItem("UID"));

  React.useEffect(() => {
    fetch(`/api/users/${UID}`)
      .then((res) => res.json())
      .then((results) => {
        setUserRole(results[0].role);
      });
  });

  let history = useHistory();
  let logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UID");
    history.push("/");
  };

  let goToUnitVideosPage = () => {
    history.push("/CreateALessonPlan");
  };

  let goToPrivateLessonsScheduling = () => {
    history.push("LessonsScheduling");
  };

  let goToTestPage = () => {
    history.push("/Tests");
  };

  let goToWrestlerView = () => {
    history.push("/WrestlersView");
  };

  let goToAdminPage = () => {
    history.push("/admin");
  };

  let callMeAScrub = () => {
    if (counter === 0) {
      alert("Scrub, I said not to press that button!");
    }
    if (counter === 1) {
      alert("Why don't you listen?");
    }
    if (counter === 2) {
      alert("How many times do you need to be told? DON'T TOUCH THE BUTTON!");
    }
    if (counter === 3) {
      alert(
        "You clearly aren't good at following directions... Maybe becoming a champion wrestler isn't for you?"
      );
    }
    if (counter === 4) {
      alert(
        'Wow, you are so persistent... I am impressed! Your persistence has paid off, you have now received the official title of: TURD. Tell your parents they can pickup their "proud parent of a turd" bumper sticker from the front desk'
      );
    }
    if (counter > 4) {
      alert("I give up!");
      setCounter(-1);
    }
    if (counter < 5) setCounter(counter + 1);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="btn btn-outline-primary"
            onClick={goToWrestlerView}
          >
            Home
          </button>
          {userRole === "admin" && (
            <Link to={`/coachesview`} className="btn btn-outline-primary">
              I'm a coach...
            </Link>
          )}
          {userRole === "coach" && (
            <Link to={`/coachesview`} className="btn btn-outline-primary">
              I'm a coach...
            </Link>
          )}
          <button
            className="btn btn-outline-primary"
            onClick={goToUnitVideosPage}
          >
            Practice Playlists
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={goToPrivateLessonsScheduling}
          >
            Lessons Scheduling
          </button>
          <button className="btn btn-outline-primary" onClick={goToTestPage}>
            Tests
          </button>
          <a target="_blank" href="https://www.wellruntournaments.com/blog-2/">
            <button className="btn btn-outline-primary">Articles</button>
          </a>
          <button className="btn btn-outline-primary" onClick={callMeAScrub}>
            Don't press this button
          </button>
          {userRole === "admin" && (
            <button className="btn btn-outline-danger" onClick={goToAdminPage}>
              Admin Panel
            </button>
          )}
          <button className="btn btn-outline-info">
            <a
              href="https://www.youtube.com/watch?v=J6oUYvNDn2Q"
              target="_blank"
            >
              Warm Up
            </a>
          </button>
          <button className="btn btn-outline-success" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
