import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { IAllVideosInPlan } from "./EditLessonPlan";
import LessonPlanOverview from "./LessonPlanOverview";
import PlayLessonPlan from "./PlayLessonPlan";

const PlayLessonPlanTwoPointO = () => {
  const [lessonPlanName, setLessonPlanName] = React.useState("no");
  const [buttonTextToSwitch, setButtonTextToSwitch] =
    React.useState("Play all");
  const [showOrHideLessonPlanOverview, setShowOrHideLessonPlanOverview] =
    React.useState(true);
  // const [showOrHidePlayLessonPlan, setShowOrHidePlayLessonPlan] =
  //   React.useState(false);
  let plandId: any = useParams();

  // const setShowOrHidePlayLessonPlanFunc = () => {
  //   if (buttonTextToSwitch === "Play all") {
  //     setShowOrHidePlayLessonPlan(!showOrHidePlayLessonPlan);
  //     setShowOrHideLessonPlanOverview(false);
  //     setButtonTextToSwitch("Overview");
  //   } else {
  //     setShowOrHideLessonPlanOverview(!showOrHideLessonPlanOverview);
  //     setShowOrHidePlayLessonPlan(false);
  //     setButtonTextToSwitch("Play all");
  //   }
  // };
  React.useEffect(() => {
    fetch(`/api/lessonplans/getLessonPlanInfo/${plandId.planId}`)
      .then((res) => res.json())
      // .then(res => console.log(res[0].name_of_lesson_plan))
      .then((res: IPlanInfo[]) =>
        setLessonPlanName(res[0].name_of_lesson_plan)
      );
  }, []);

  // if (!lessonPlanName) {
  //   return (
  //     <div>
  //       <h1>Loading ...</h1>
  //     </div>
  //   );
  // }
  // console.log(lessonPlanName)
  return (
    <div>
      <div>
        <Link to={"/CreateALessonPlan"} className="btn btn-primary">
          Back to Lesson Plans
        </Link>
      </div>
      <h1>{lessonPlanName}</h1>

      <>
        <div className="d-flex justify-content-between">
          <Link
            to={`/playEntireLessonPlan/${plandId.planId}`}
            className="btn btn-warning"
            target={"_blank"}
          >
            {buttonTextToSwitch}
          </Link>
        </div>
        {showOrHideLessonPlanOverview && <LessonPlanOverview />}
        {/* {showOrHidePlayLessonPlan && <PlayLessonPlan />} */}
      </>
    </div>
  );
};

export default PlayLessonPlanTwoPointO;

export interface IPlanInfo {
  id: number;
  name_of_lesson_plan: string;
  created_by: number;
  date_created: Date;
}

//possibly need a new column in DB in 'lesson_plans' table = tenant
