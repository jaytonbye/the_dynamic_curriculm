import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import WrestlersView from "./WrestlersView";
import Admin from "./Admin";
import SingleLevel from "./SingleLevel";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ProfilePage from "./ProfilePage";
import Tests from "./Tests";
import AllGradesAllLevels from "./AllGradesAllLevels";
import PasswordResetLandingPage from "./PasswordResetLandingPage";
import ShowAllLogins from "./ShowAllLogins";
import UnitVideosPage from "./UnitVideosPage";
import CreateTeamAccount from "./CreateTeamAccount";
import CoachesViewTwoPointO from "./CoachesViewTwoPOintO";
import PlayLessonPlan from "./ForPracticePlaylistComponents/PlayLessonPlan";
import CreateAndEditPlan from "./ForPracticePlaylistComponents/CreateAndEditPlan";
import EditLessonPlan from "./ForPracticePlaylistComponents/EditLessonPlan";
import ViewPlans from "./ForPracticePlaylistComponents/components/ViewPlans";
import PlayLessonPlanStartPage from "./ForPracticePlaylistComponents/PlayLessonPlanStartPage";

const App = (props: AppProps) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/coachesview">
            <CoachesViewTwoPointO />
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
          <Route exact path="/createTeamAccount">
            <CreateTeamAccount />
          </Route>
          <Route exact path="/tests">
            <Tests />
          </Route>
          <Route exact path="/AllGradesAllLevels">
            <AllGradesAllLevels />
          </Route>

          <Route exact path="/CreateALessonPlan">
            <CreateAndEditPlan />
          </Route>
          <Route exact path="/EditALessonPlan/:planId">
            <EditLessonPlan />
          </Route>
          <Route exact path="/PlayLessonPlan/:planId">
            <PlayLessonPlanStartPage />
          </Route>
          <Route exact path="/playEntireLessonPlan/:planId">
            <PlayLessonPlan />
          </Route>

          <Route path="/passwordResetLandingPage/:encryptedIdInUrl">
            <PasswordResetLandingPage />
          </Route>
          <Route path="/ShowAllLoggins">
            <ShowAllLogins />
          </Route>
          <Route path="/UnitVideosPage">
            <UnitVideosPage />
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
