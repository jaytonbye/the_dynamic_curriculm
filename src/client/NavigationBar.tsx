import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function NavigationBar() {
  const [counter, setCounter] = React.useState(0);

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

  let goToWrestlerView = () => {
    history.push("/WrestlersView");
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
          <a target="_blank" href="https://www.wellruntournaments.com/blog-2/">
            <button className="btn btn-outline-primary">Articles</button>
          </a>
          <button className="btn btn-outline-primary" onClick={callMeAScrub}>
            Don't press this button
          </button>
          <button className="btn btn-outline-success" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
