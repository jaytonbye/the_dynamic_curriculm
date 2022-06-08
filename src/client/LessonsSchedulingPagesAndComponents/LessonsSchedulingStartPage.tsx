import * as React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import CoachesFullPrivateLessonsScheduleCalendarView from "./SchedulingComponents/CalendarComponents/CoachesFullPrivateLessonsScheduleCalendarView";
import CoachesAvailabilityForm from "./SchedulingComponents/CoachesAvailabilityForm";
import ScheduleNewPrivateLessonForm from "./SchedulingComponents/ScheduleNewPrivateLessonForm";

const LessonsSchedulingStartPage = () => {
  let token = localStorage.getItem("token");
  let [UID, setUID] = useState();
  let [tenant, setTenant] = useState<string>();
  let [role, setRole] = useState<string>();
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
          {showOrHideCochesAvailabilityComponent && <CoachesAvailabilityForm />}
          {showOrHideScheduleNewLessonComponent && (
            <ScheduleNewPrivateLessonForm />
          )}
          <div>
            {role === "admin" || role === "coach" ? (
              <CoachesFullPrivateLessonsScheduleCalendarView coachesId={UID} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsSchedulingStartPage;
