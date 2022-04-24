import * as React from "react";
import { Link } from "react-router-dom";
import LessonPlanOverview from "./LessonPlanOverview";
import PlayLessonPlan from "./PlayLessonPlan";

const PlayLessonPlanTwoPointO = () => {

    const [showOrHideLessonPlanOverview, setShowOrHideLessonPlanOverview] = React.useState(
        false
      );
      const [showOrHidePlayLessonPlan, setShowOrHidePlayLessonPlan] = React.useState(
        false
      );

      const setShowOrHideLessonPlanOverviewFunc = () => {
        setShowOrHideLessonPlanOverview(!showOrHideLessonPlanOverview);
        setShowOrHidePlayLessonPlan(false)
      };
    
      const setShowOrHidePlayLessonPlanFunc = () => {
        setShowOrHidePlayLessonPlan(!showOrHidePlayLessonPlan);
        setShowOrHideLessonPlanOverview(false)
      };
    
  return (
    <div>
      <div>
        <Link to={"/CreateALessonPlan"} className="btn btn-primary">
          Back to Lesson Plans
        </Link>
      </div>
      <h1>view it</h1>

      <>
      <div className="d-flex justify-content-between">
        <button className="btn btn-success ml-2" onClick={setShowOrHideLessonPlanOverviewFunc}>
          Lesson Plan Overview
        </button>
        <button
          className="btn btn-warning"
          onClick={setShowOrHidePlayLessonPlanFunc}
        >
          Play Plans
        </button>
      </div>
      {showOrHideLessonPlanOverview && <LessonPlanOverview />}
      {showOrHidePlayLessonPlan && <PlayLessonPlan />} 
    </>
      
    </div>
  );
};

export default PlayLessonPlanTwoPointO;

//possibly need a new column in DB in 'lesson_plans' table = tenant
//also a bug with coahes name when clckin on view all plan button ****************
