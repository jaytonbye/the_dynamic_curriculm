import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CoachesAvailabilityChart from "./CoachesAvailabilityChart";

//so far it all works niceley
//note: may be a better way to do this(via values within each option in the select menu but this works for now just a bit messy)

const CoachesAvailabilityForm = () => {
  let weekdayArray: string[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let hourArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let minuteArray: Array<number | string> = [
    "00",
    "0" + 5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55,
  ];
  let [
    conditionUsedOnlyForRenderingOutsideComponent,
    setConditionUsedOnlyForRenderingOutsideComponent,
  ] = useState<boolean>(true);
  let token = localStorage.getItem("token");
  let [coaches_UID, setCoaches_UID] = useState<number>(); //not user inputed
  let [dayOfWeek, setDayOfWeek] = useState<string>();
  let [startTimeHour, setStartTimeHour] = useState<number | string>();
  let [startTimeMinute, setStartTimeMinute] = useState<number>();
  let [startTimeAMPM, setStartTimeAMPM] = useState<string>();
  let [endTimeHour, setEndTimeHour] = useState<number | string>();
  let [endTimeMinute, setEndTimeMinute] = useState<number>();
  let [endTimeAMPM, setEndTimeAMPM] = useState<string>();

  // useEffect here to get user ID will help if i have to use tenant down the road
  useEffect(() => {
    fetch(`/api/schedulingLessons/validateToketInputAvailability`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => setCoaches_UID(res.userId));
  }, []);

  let handleSubmitAvailability = () => {
    if (
      !dayOfWeek ||
      !startTimeHour ||
      !startTimeMinute ||
      !startTimeAMPM ||
      !endTimeHour ||
      !endTimeMinute ||
      !endTimeAMPM
    ) {
      alert("Please make sure to fill out the entire form");
      return;
    } else {
      let startHourFinal: number | string = startTimeHour; // there was a delay isse with the use state; at least it seemed so when console.logging **** try this without using the "finals"
      let endHourFinal: number | string = endTimeMinute;
      if (startTimeAMPM === "pm") {
        startHourFinal = 12 + Number(startTimeHour);
      } else {
        if (startTimeHour < 10) {
          startHourFinal = "0" + startTimeHour;
        }
      }
      if (endTimeAMPM === "pm") {
        endHourFinal = 12 + Number(endTimeHour);
      } else {
        if (endTimeHour < 10) {
          endHourFinal = "0" + endTimeHour;
        }
      }
      //   if (startTimeAMPM === "pm") {
      //     setStartTimeHour(12 + Number(startTimeHour));
      //   } else {
      //     if (startTimeHour < 10) {
      //       setStartTimeHour("0" + startTimeHour);
      //     }
      //   }
      //   if (endTimeAMPM === "pm") {
      //     setEndTimeHour(12 + Number(endTimeHour));
      //   } else {
      //     if (endTimeHour < 10) {
      //       setEndTimeHour("0" + endTimeHour);
      //     }
      //   }
      fetch(`/api/schedulingLessons/postNewAvailability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coaches_UID,
          dayOfWeek,
          startTime: `${startHourFinal}:${startTimeMinute}:00`,
          endTime: `${endHourFinal}:${endTimeMinute}:00`,
          //   startTime: `${startTimeHour}:${startTimeMinute}:00`,     // it was working on first click but it added a 0 in front of it? probably missing somthing try again
          //   endTime: `${endTimeHour}:${endTimeMinute}:00`,
        }),
      })
        // .then(res => res.json())
        .then((res) => {
          if (res.status === 200) {
            alert("Your availability has been added successfully!");
          } else {
            alert("Something went wrong while adding your availability"); //no way to test this right now
          }
        });
      //   console.log(`
      //   weekday: ${dayOfWeek},
      //   start time: ${startHourFinal}:${startTimeMinute}:00,
      //   end time: ${endHourFinal}:${endTimeMinute}:00
      //   `);
      //       console.log(`
      //   weekday: ${dayOfWeek},
      //   start time: ${startTimeHour}:${startTimeMinute}:${startTimeAMPM},
      //   end time: ${endTimeHour}:${endTimeMinute}:${endTimeAMPM}
      //   `);
    }
    setConditionUsedOnlyForRenderingOutsideComponent(
      !conditionUsedOnlyForRenderingOutsideComponent
    );
  };

  let timeInputFormHTML = (
    startOrEndHour: any,
    startOrEndMinute: any,
    startOrEndAMPM: any
  ) => {
    return (
      <>
        <select
          onChange={(e) => {
            startOrEndHour(e.target.value);
          }}
        >
          <option value=""></option>
          {hourArray.map((hour) => {
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => {
            startOrEndMinute(e.target.value);
          }}
        >
          <option value=""></option>
          {minuteArray.map((minute) => {
            return (
              <option key={minute} value={minute}>
                {minute}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => {
            startOrEndAMPM(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="am">am</option>
          <option value="pm">pm</option>
        </select>
      </>
    );
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// html
  return (
    <div>
      <h3>Availability</h3>
      <hr />
      <div className="">
        <div>
          <label className="h2 mt-1 mb-1">Select weekday:</label>
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
        <div className="w-50">
          <div className="d-flex flex-wrap">
            <div className="col-10">
              <label className="h2 mt-3 mb-3 mr-2">Start time:</label>
              {timeInputFormHTML(
                setStartTimeHour,
                setStartTimeMinute,
                setStartTimeAMPM
              )}
            </div>
            <div className="col-10">
              <label className="h2 mt-3 mb-3 mr-2">End time:</label>
              {timeInputFormHTML(
                setEndTimeHour,
                setEndTimeMinute,
                setEndTimeAMPM
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmitAvailability}
            className="btn btn-primary"
          >
            Submit availability
          </button>
        </div>
      </div>
      <hr />
      <div>
        {coaches_UID ? (
          <CoachesAvailabilityChart
            coachId={coaches_UID}
            conditionUseForReRendering={
              conditionUsedOnlyForRenderingOutsideComponent
            }
          />
        ) : (
          "Loading ..."
        )}
      </div>
    </div>
  );
};

export default CoachesAvailabilityForm;
