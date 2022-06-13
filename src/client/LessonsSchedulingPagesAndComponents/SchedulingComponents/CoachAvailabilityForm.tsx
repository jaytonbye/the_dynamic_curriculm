import * as React from "react";
import * as dateTimeValues from "../ServicesForPrivateLessonScheduling/dateTimeValues";
import * as dateTimeHandlingFunctions from "../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CoachesAvailabilityChart from "./CoachAvailabilityChart";
import e from "express";
import moment from "moment";

//so far it all works niceley
//note: may be a better way to do this(via values within each option in the select menu but this works for now just a bit messy)

const CoachAvailabilityForm = (props: IProps) => {
  let weekdayArray: string[] = dateTimeValues.weekdayArrayDaysOfWeekStrings;
  let [
    conditionUsedOnlyForRenderingOutsideComponent,
    setConditionUsedOnlyForRenderingOutsideComponent,
  ] = useState<boolean>(true);
  let token = localStorage.getItem("token");
  let [coaches_UID, setCoaches_UID] = useState<number>(); //not user inputed
  let [dayOfWeek, setDayOfWeek] = useState<string>();
  let [startTime, setStartTime] = useState<string>();
  let [endTime, setEndTime] = useState<string>();

  // useEffect here to get user ID will help if i have to use tenant down the road
  useEffect(() => {
    fetch(`/api/schedulingLessons/validateToketInputAvailability`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => setCoaches_UID(res.userId));
  }, []);

  let handleSubmitAvailability = () => {
    if (!dayOfWeek || !startTime || !endTime) {
      alert("Please make sure to fill out the entire form");
      return;
    } else {
      let startTimeFull = `${startTime}:00`;
      let endTimeFull = `${endTime}:00`;
      let checkForValidAvailability =
        dateTimeHandlingFunctions.makesSureStartEndTimesAreValidAndOnSameDay(
          startTimeFull,
          endTimeFull,
          false
        );
      if (checkForValidAvailability) {
        fetch(`/api/schedulingLessons/postNewAvailability`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            coaches_UID,
            dayOfWeek,
            startTime: startTimeFull,
            endTime: endTimeFull,
          }),
        })
          .then((res) => {
            setConditionUsedOnlyForRenderingOutsideComponent(
              !conditionUsedOnlyForRenderingOutsideComponent
            );
            if (res.status === 200) {
              alert("Your availability has been added successfully!");
            } else {
              alert("Something went wrong while adding your availability"); //no way to test this right now
            }
          })
          .then(() => props.funcFromStartPageToRenderComp());
      } else {
        alert("Invalid time: Start time must be earlier than end time");
      }
      // setConditionUsedOnlyForRenderingOutsideComponent(
      //   !conditionUsedOnlyForRenderingOutsideComponent
      // );
    }
  };

  return (
    <div>
      <div className="m-auto mb-5 card p-3 d-flex justify-content-center text-center col-md-7 col-12">
        <div className="mb-3">
          <h3 className="">
            <u>Add availability</u>
          </h3>
        </div>
        <div className=" d-flex flex-wrap justify-content-center">
          <div className="col-12 d-flex flex-wrap align-items-center justify-content-center mt-2 mb-2">
            <h5 className="mr-2">Select weekday:</h5>
            <select
              onChange={(e) => {
                setDayOfWeek(e.target.value);
              }}
            >
              <option value=""></option>
              {weekdayArray.map((weekday) => {
                return (
                  <option key={weekdayArray.indexOf(weekday)} value={weekday}>
                    {weekday}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 d-flex flex-wrap justify-content-center">
            <div className="col-12 d-flex flex-wrap align-items-center justify-content-center mt-2 mb-2 p-0">
              <h5 className="mr-2">Start time:</h5>
              <input
                onChange={(e: any) => setStartTime(e.target.value)}
                type="time"
                id="appt"
                name="appt"
              />
            </div>
            <div className="col-12 d-flex flex-wrap align-items-center justify-content-center mt-2 mb-2 p-0">
              <h5 className="mr-2">End time:</h5>
              <input
                onChange={(e: any) => setEndTime(e.target.value)}
                type="time"
                id="appt"
                name="appt"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmitAvailability}
              className="btn btn-warning"
            >
              Submit availability
            </button>
          </div>
        </div>
      </div>
      <div>
        {coaches_UID ? (
          <CoachesAvailabilityChart
            coachId={coaches_UID}
            conditionUseForReRendering={
              conditionUsedOnlyForRenderingOutsideComponent
            }
            funcFromStartPageToChangeRenderBool={
              props.funcFromStartPageToRenderComp
            }
          />
        ) : (
          "Loading ..."
        )}
      </div>
      <hr style={{ height: "2px", backgroundColor: "black" }} />
    </div>
  );
};

export default CoachAvailabilityForm;

interface IProps {
  funcFromStartPageToRenderComp: any;
}
