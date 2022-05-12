import * as React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  let [coaches_UID, setCoaches_UID] = useState<number>(localStorage.UID); //not user inputed
  let [dayOfWeek, setDayOfWeek] = useState<string>();
  let [startTimeHour, setStartTimeHour] = useState<number | string>();
  let [startTimeMinute, setStartTimeMinute] = useState<number>();
  let [startTimeAMPM, setStartTimeAMPM] = useState<string>();
  let [endTimeHour, setEndTimeHour] = useState<number | string>();
  let [endTimeMinute, setEndTimeMinute] = useState<number>();
  let [endTimeAMPM, setEndTimeAMPM] = useState<string>();

  // useEffect here to get user ID will help if i have to use tenant down the road

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
    //   let startHourFinal: number | string = startTimeHour; // there was a delay isse with the use state; at least it seemed so when console.logging **** try this without using the "finals"
    //   let endHourFinal: number | string = endTimeMinute;
    //   if (startTimeAMPM === "pm") {
    //     startHourFinal = 12 + Number(startTimeHour);
    //   } else {
    //     if (startTimeHour < 10) {
    //       startHourFinal = "0" + startTimeHour;
    //     }
    //   }
    //   if (endTimeAMPM === "pm") {
    //     endHourFinal = 12 + Number(endTimeHour);
    //   } else {
    //     if (endTimeHour < 10) {
    //       endHourFinal = "0" + endTimeHour;
    //     }
    //   }
    if (startTimeAMPM === "pm") {
        setStartTimeHour(12 + Number(startTimeHour));
      } else {
        if (startTimeHour < 10) {
          setStartTimeHour("0" + startTimeHour);
        }
      }
      if (endTimeAMPM === "pm") {
        setEndTimeHour(12 + Number(endTimeHour));
      } else {
        if (endTimeHour < 10) {
          setEndTimeHour("0" + endTimeHour);
        }
      }
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
      <div>
        <h3>Availability</h3>

        <div>
          <label className="h4 mt-5 mb-5 mr-2">Select weekday:</label>
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
        <div>
          <label className="h4 mt-5 mb-5 mr-2">Start time:</label>
          {timeInputFormHTML(
            setStartTimeHour,
            setStartTimeMinute,
            setStartTimeAMPM
          )}
          <label className="h4 mt-5 mb-5 mr-2">End time:</label>
          {timeInputFormHTML(setEndTimeHour, setEndTimeMinute, setEndTimeAMPM)}
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
    </div>
  );
};

export default CoachesAvailabilityForm;
