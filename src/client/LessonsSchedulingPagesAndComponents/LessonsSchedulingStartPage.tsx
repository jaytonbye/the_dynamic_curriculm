import * as React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import CoachesPrivateLessonScheduleWeeklyCalendarHeader from "./SchedulingComponents/CalendarComponents/CoachesPrivateLessonScheduleWeeklyCalendarHeader";
import CoachAvailabilityForm from "./SchedulingComponents/CoachAvailabilityForm";
import ScheduleNewPrivateLessonForm from "./SchedulingComponents/ScheduleNewPrivateLessonForm";

const LessonsSchedulingStartPage = () => {
  let token = localStorage.getItem("token");
  let [UID, setUID] = useState<number>();
  let [tenant, setTenant] = useState<string>();
  let [role, setRole] = useState<string>();
  let [boolUsedToRenderFromStartPage, setBoolUsedToRenderFromStartPage] =
    useState<boolean>(true);
  let [
    showOrHideScheduleNewLessonComponent,
    setShowOrHideScheduleNewLessonComponent,
  ] = useState<boolean>(false);
  let [
    showOrHideCochesAvailabilityComponent,
    setShowOrHideCochesAvailabilityComponent,
  ] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/schedulingLessons/validateToketInputAvailability`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setUID(res.userId);
        setTenant(res.tenant);
        setRole(res.role);
      });
  }, []);

  let funcFromStartPageToChangeRenderBool = () => {
    setBoolUsedToRenderFromStartPage(!boolUsedToRenderFromStartPage);
  };

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
      <NavigationBar />
      <div className="m-3">
        <hr />
        <div className="mb-3">
          <button
            onClick={showCoachesAvailabilityFormFunc}
            className="btn btn-warning mr-2"
          >
            Edit Availability
          </button>
          <button
            onClick={showScheduleNewLessonComponentFunc}
            className="btn btn-success mr-2"
          >
            Schedule lesson
          </button>
        </div>

        <div>
          {showOrHideCochesAvailabilityComponent && (
            <CoachAvailabilityForm
            funcFromStartPageToRenderComp={funcFromStartPageToChangeRenderBool}
            />
          )}
          {showOrHideScheduleNewLessonComponent && (
            <ScheduleNewPrivateLessonForm funcFromStartPageToRenderComp={funcFromStartPageToChangeRenderBool} />
          )}
          <div>
            {role === "admin" || role === "coach" ? (
              <CoachesPrivateLessonScheduleWeeklyCalendarHeader
                coachesId={UID}
                boolForRenderFromStartPage={boolUsedToRenderFromStartPage}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsSchedulingStartPage;
