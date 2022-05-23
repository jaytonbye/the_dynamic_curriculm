import * as React from "react";
import { useState } from "react";
import NavigationBar from "../NavigationBar";
import CoachesAvailabilityForm from "./SchedulingComponents/CoachesAvailabilityForm";
import ScheduleNewPrivateLessonForm from "./SchedulingComponents/ScheduleNewPrivateLessonForm";

const LessonsSchedulingStartPage = () => {
  let [
    showOrHideScheduleNewLessonComponent,
    setShowOrHideScheduleNewLessonComponent,
  ] = useState<boolean>(true);
  let [
    showOrHideCochesAvailabilityComponent,
    setShowOrHideCochesAvailabilityComponent,
  ] = useState<boolean>(false);

  let showCoachesAvailabilityFormFunc = () => {
    setShowOrHideCochesAvailabilityComponent(
      !showOrHideCochesAvailabilityComponent
    );
    setShowOrHideScheduleNewLessonComponent(false);
  };

  let showScheduleNewLessonComponentFunc = () => {
    setShowOrHideScheduleNewLessonComponent(
      !showOrHideScheduleNewLessonComponent
    );
    setShowOrHideCochesAvailabilityComponent(false);
  };

  return (
    <div>
      <div>
        <button
          onClick={showCoachesAvailabilityFormFunc}
          className="btn btn-primary"
        >
          Show/edit Availability
        </button>
        <button
          onClick={showScheduleNewLessonComponentFunc}
          className="btn btn-success"
        >
          schedule new lesson
        </button>
      </div>

      <div>
        {showOrHideCochesAvailabilityComponent && <CoachesAvailabilityForm />}
        {showOrHideScheduleNewLessonComponent && <ScheduleNewPrivateLessonForm />}
      </div>
    </div>
  );
};

export default LessonsSchedulingStartPage;
