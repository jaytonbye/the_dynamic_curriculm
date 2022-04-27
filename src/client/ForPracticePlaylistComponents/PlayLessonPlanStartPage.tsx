import * as React from "react";
import { Link, useParams } from "react-router-dom";
import LessonPlanOverview from "./LessonPlanOverview";

let PlayLessonPlanStartPage = () => {
  let [lessonPlanName, setLessonPlanName] = React.useState("no");
  let plandId: any = useParams();

  React.useEffect(() => {
    fetch(`/api/lessonplans/getLessonPlanInfo/${plandId.planId}`) // try to upack this and rename it it look horrible
      .then((res) => res.json())
      .then((res: IPlanInfo[]) =>
        setLessonPlanName(res[0].name_of_lesson_plan)
      );
  }, []);

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
            Play All
          </Link>
        </div>
        <LessonPlanOverview />
      </>
    </div>
  );
};

export default PlayLessonPlanStartPage;

export interface IPlanInfo {
  id: number;
  name_of_lesson_plan: string;
  created_by: number;
  date_created: Date;
}
