import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import CoachesView from "./CoachesView";
import WrestlersView from "./WrestlersView";
import Admin from "./Admin";
import SingleLevel from "./SingleLevel";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ProfilePage from "./ProfilePage";
import Tests from "./Tests";
import AllGradesAllLevels from "./AllGradesAllLevels";
import AllGradesAllLevelsFor2Wrestlers from "./AllGradesAllLevelsFor2Wrestlers";
import PasswordResetLandingPage from "./PasswordResetLandingPage";

const App = (props: AppProps) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/coachesview">
            <CoachesView />
          </Route>
          <Route exact path="/wrestlersview">
            <WrestlersView />
          </Route>
          <Route exact path="/profilepage">
            <ProfilePage />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/level/:level">
            <SingleLevel />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/createAccount">
            <CreateAccount />
          </Route>
          <Route exact path="/tests">
            <Tests />
          </Route>
          <Route exact path="/AllGradesAllLevels">
            <AllGradesAllLevels />
          </Route>
          <Route exact path="/blah">
            <AllGradesAllLevelsFor2Wrestlers
              wrestler1Id="21"
              wrestler2Id="87"
            />
          </Route>
          <Route path="/passwordResetLandingPage/:encryptedIdInUrl">
            <PasswordResetLandingPage />
          </Route>
          <Route path="*">
            <h1>404 not found error, you probably went to the wrong page...</h1>
            <a href="/WrestlersView">Go back to the homepage!</a>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

interface AppProps {}

export default App;
