import * as React from "react";
import NavigationBar from "../NavigationBar";
import CreatePlan from "./components/CreatePlan";
import ViewPlans from "./components/ViewPlans";

let CreateAndEditPlan = () => {
  let token = localStorage.getItem("token");
  let [buttonToCreateOrView, setButtonToCreateOrView] = React.useState(
    "Create A Lesson Plan"
  );
  let [showOrHideCreateLessonPlan, setshowOrHideCreateLessonPlan] =
    React.useState(false);
  let [showOrHideAllPlans, setShowOrHideAllPlans] = React.useState(true);
  let [role, setRole] = React.useState("");

  let showOrHideCreateLessonPlanFunc = () => {
    if (buttonToCreateOrView === "Create A Lesson Plan") {
      setshowOrHideCreateLessonPlan(!showOrHideCreateLessonPlan);
      setShowOrHideAllPlans(false);
      setButtonToCreateOrView("View All your Plans");
    } else {
      setShowOrHideAllPlans(!showOrHideAllPlans);
      setshowOrHideCreateLessonPlan(false);
      setButtonToCreateOrView("Create A Lesson Plan");
    }
  };

  let createButtonBasedOnRole = () => {
    if (role === "admin" || role === "coach") {
      return (
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-success m-3"
            onClick={showOrHideCreateLessonPlanFunc}
          >
            {buttonToCreateOrView}
          </button>
        </div>
      );
    }
  };

  React.useEffect(() => {
    fetch(`/api/lessonplans/validateToketLessonPlanCreate`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setRole(res.role);
      });
  }, []);

  return (
    <>
      <NavigationBar />
      {createButtonBasedOnRole()}

      {showOrHideCreateLessonPlan && <CreatePlan />}
      {showOrHideAllPlans && <ViewPlans />}
    </>
  );
};

export default CreateAndEditPlan;
