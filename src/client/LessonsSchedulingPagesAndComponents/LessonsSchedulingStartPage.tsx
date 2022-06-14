import * as React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import CoachesPrivateLessonScheduleWeeklyCalendarHeader from "./SchedulingComponents/CalendarComponents/CoachesPrivateLessonScheduleWeeklyCalendarHeader";
import CoachAvailabilityForm from "./SchedulingComponents/CoachAvailabilityForm";
import ScheduleNewPrivateLessonForm from "./SchedulingComponents/ScheduleNewPrivateLessonForm";
import ViewAllCoachesSchedules from "./SchedulingComponents/ViewAllCoachesSchedules";
import PhoneNumberForm from "./SchedulingComponents/PhoneNumberForm";

const LessonsSchedulingStartPage = () => {
  let token = localStorage.getItem("token");
  let [UID, setUID] = useState<number>();
  let [tenant, setTenant] = useState<string>();
  let [role, setRole] = useState<string>();
  let [showAvailabilityButton, setShowAvailabilityButton] =
    useState<boolean>(true);
  let [showscheduleLessonButton, setShowscheduleLessonButton] =
    useState<boolean>(true);
  let [showPhoneNumberFormButton, setShowPhoneNumberFormButton] =
    useState<boolean>(true);
  let [
    textForViewAllCoachesOrViewYourSched,
    setTextForViewAllCoachesOrViewYourSched,
  ] = useState<string>("All coaches");
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
  let [showOrHideViewAllCoaches, setShowOrHideViewAllCoaches] =
    useState<boolean>(false);
  let [showOrHideCalendar, setShowOrHideCalendar] = useState<boolean>(true);
  let [showOrHidePhoneNumberForm, setShowOrHidePhoneNumberForm] =
    useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/schedulingLessons/validateToketInputAvailability`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setUID(res.userId);
        setTenant(res.tenant);
        setRole(res.role);
        if (res.role === "wrestler") {
          setShowOrHideViewAllCoaches(true);
        }
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
    setShowOrHideViewAllCoaches(false);
    setShowOrHideCalendar(true);
    setShowOrHidePhoneNumberForm(false);
  };

  let showScheduleNewLessonComponentFunc = () => {
    setShowOrHideScheduleNewLessonComponent(
      !showOrHideScheduleNewLessonComponent
    );
    setShowOrHideCochesAvailabilityComponent(false);
    setShowOrHideViewAllCoaches(false);
    setShowOrHideCalendar(true);
    setShowOrHidePhoneNumberForm(false);
  };

  let showPhoneNumberForm = () => {
    setShowOrHidePhoneNumberForm(!showOrHidePhoneNumberForm);
    setShowOrHideScheduleNewLessonComponent(false);
    setShowOrHideCochesAvailabilityComponent(false);
    setShowOrHideViewAllCoaches(false);
    setShowOrHideCalendar(true);
  };

  let showOrHideViewAllCoachesFunc = () => {
    if (!showOrHideViewAllCoaches) {
      setTextForViewAllCoachesOrViewYourSched("Your schedule");
      setShowOrHideViewAllCoaches(true);
      setShowOrHideScheduleNewLessonComponent(false);
      setShowOrHideCochesAvailabilityComponent(false);
      setShowOrHideCalendar(false);
      setShowAvailabilityButton(false);
      setShowscheduleLessonButton(false);
      setShowPhoneNumberFormButton(false);
    } else {
      setTextForViewAllCoachesOrViewYourSched("All coaches");
      setShowOrHideViewAllCoaches(false);
      setShowOrHideScheduleNewLessonComponent(false);
      setShowOrHideCochesAvailabilityComponent(false);
      setShowOrHidePhoneNumberForm(false);
      setShowOrHideCalendar(true);
      setShowAvailabilityButton(true);
      setShowscheduleLessonButton(true);
      setShowPhoneNumberFormButton(true);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="m-3">
        <hr />
        {role === "admin" || role === "coach" ? (
          <div className="mb-3">
            {showAvailabilityButton && (
              <button
                onClick={showCoachesAvailabilityFormFunc}
                className="btn btn-warning mr-2"
              >
                Edit Availability
              </button>
            )}
            {showscheduleLessonButton && (
              <button
                onClick={showScheduleNewLessonComponentFunc}
                className="btn btn-success mr-2"
              >
                Schedule lesson
              </button>
            )}
            {showPhoneNumberFormButton && (
              <button
                onClick={showPhoneNumberForm}
                className="btn btn-warning mr-2"
              >
                Edit phone number
              </button>
            )}
            <button
              onClick={showOrHideViewAllCoachesFunc}
              className="btn btn-success"
            >
              {textForViewAllCoachesOrViewYourSched}
            </button>
          </div>
        ) : null}

        <div>
          {showOrHideViewAllCoaches && (
            <ViewAllCoachesSchedules tenant={tenant} />
          )}

          {showOrHideCochesAvailabilityComponent && (
            <CoachAvailabilityForm
              funcFromStartPageToRenderComp={
                funcFromStartPageToChangeRenderBool
              }
            />
          )}
          {showOrHideScheduleNewLessonComponent && (
            <ScheduleNewPrivateLessonForm
              funcFromStartPageToRenderComp={
                funcFromStartPageToChangeRenderBool
              }
            />
          )}
          {showOrHidePhoneNumberForm && <PhoneNumberForm userId={UID}/>}
          <div>
            {role === "admin" || role === "coach"
              ? showOrHideCalendar && (
                  <CoachesPrivateLessonScheduleWeeklyCalendarHeader
                    coachesId={UID}
                    boolForRenderFromStartPage={boolUsedToRenderFromStartPage}
                    isAdminBool={true}
                  />
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsSchedulingStartPage;
