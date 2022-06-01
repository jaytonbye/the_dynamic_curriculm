import * as React from "react";
import { useState, useEffect } from "react";
import * as scheduleLessonFunctions from "../ServicesForPrivateLessonScheduling/privateLessonScheduleFuncs";
import * as dateTimeValues from "../ServicesForPrivateLessonScheduling/dateTimeValues";
import CoachesFullPrivateLessonsSchedule from "./CalendarComponents/CoachesFullPrivateLessonsSchedule";
import CoachesFullPrivateLessonsScheduleCalendarView from "./CalendarComponents/CoachesFullPrivateLessonsScheduleCalendarView";
import * as dateTimeHandlingFunctions from "../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import {
  IPrivateLessonInfo,
  IDateIncResult,
} from "../ServicesForPrivateLessonScheduling/interfaces";

// hovering over lables are triggering re render of component ... dafuq?
//make it look better
// test this shit = mkae sure you are adding corrent corresponding values

const ScheduleNewPrivateLessonForm = () => {
  let yearArray: number[] = dateTimeValues.yearArrayValues;
  let monthArray: Array<number | string> = dateTimeValues.monthArrayValues;
  let dayArray: Array<number | string> = dateTimeValues.dayArrayValues;
  let hourArray: number[] = dateTimeValues.hourArrayValues;
  let minuteArray: Array<number | string> = dateTimeValues.minuteArrayValues;
  let token = localStorage.getItem("token");
  let [personal_info, setPersonalInfo] = useState<Array<any>>([]);
  let [coaches_UID, setCoaches_UID] = useState<number>(); // not inputed
  let [wrestlerId, setWrestlerId] = useState<number>();
  let [lessonDateMonth, setLessonDateMonth] = useState<number | string>();
  let [lessonDateDay, setLessonDateDay] = useState<number | string>();
  let [lessonDateYear, setLessonDateYear] = useState<number>();
  let [lessonTimeHour, setLessonTimeHour] = useState<number | string>();
  let [lessonTimeMinute, setLessonTimeMinute] = useState<number | string>();
  let [lessonTimeAMPM, setLessonTimeAMPM] = useState<string>();
  let [durationHours, setDurationHours] = useState<number | string>(1);
  let [durationMinutes, setDurationMinutes] = useState<number | string>("00");
  let [seriesEndDateMonth, setSeriesEndDateMonth] = useState<number | string>();
  let [seriesEndDateDay, setSeriesEndDateDay] = useState<number | string>();
  let [seriesEndDateYear, setSeriesEndDateYear] = useState<number>();
  let [wieght, setWeight] = useState<string>("N/A");
  let [age, setAge] = useState<string>("N/A");
  let [war, setWar] = useState<string>("N/A");

  //gets all of the user_profiles for proper tenant - this gets everyone, wrestlers, coaches and admin, not my code just copied and pasted
  useEffect(() => {
    fetch(`/api/schedulingLessons/validateToketInputAvailability`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setCoaches_UID(res.userId);
        fetch(`/api/personal_info/${res.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((results) => {
            setPersonalInfo(results);
          });
      });
  }, []);

  const onWrestlerChange = (event: any) => {
    let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
    let wrestlerIdAfterSlice = event.target.value.slice(
      whereToSliceFrom,
      event.target.value.length
    );
    setWrestlerId(Number(wrestlerIdAfterSlice));
  };

  let handleSubmitLessonPlan = (e: any) => {
    e.preventDefault();
    scheduleLessonFunctions.submitPrivateLessonFunc(
      coaches_UID,
      wrestlerId,
      lessonDateMonth,
      lessonDateDay,
      lessonDateYear,
      lessonTimeHour,
      lessonTimeMinute,
      lessonTimeAMPM,
      durationHours,
      durationMinutes,
      seriesEndDateMonth,
      seriesEndDateDay,
      seriesEndDateYear,
      wieght,
      age,
      war
    );
  };

  // //makes sure everything is filled out and if its a series it then makes sure everyhting in the series section is filled out
  // let handleSubmitLessonPlan = (e: any) => {
  //   e.preventDefault();
  //   if (
  //     !coaches_UID ||
  //     !wrestlerId ||
  //     !lessonDateMonth ||
  //     !lessonDateDay ||
  //     !lessonDateYear ||
  //     !lessonTimeHour ||
  //     !lessonTimeMinute ||
  //     !lessonTimeAMPM
  //   ) {
  //     alert("fill out entire form");
  //   } else if (seriesEndDateMonth || seriesEndDateDay || seriesEndDateYear) {
  //     if (!seriesEndDateMonth || !seriesEndDateDay || !seriesEndDateYear) {
  //       alert("if this is a series, please complete the entire series form");
  //     } else {
  //       submitIntoServerFunc(true);
  //     }
  //   } else {
  //     submitIntoServerFunc(false);
  //   }
  // };

  // let submitIntoServerFunc = (conditionForSeries: boolean) => {
  //   let newLessonInfo: IPrivateLessonInfo;
  //   if (!conditionForSeries) {
  //     newLessonInfo = {
  //       coaches_UID,
  //       wrestlerId,
  //       dateOfLesson: `${lessonDateYear}-${lessonDateMonth}-${lessonDateDay}`,
  //       startTime: timeConfigureForDatabaseFunc(),
  //       duration: `${durationHours}.${durationMinutes}`,
  //       notes: `Weight:${wieght} Age:${age} War:${war}`,
  //       seriesName: null,
  //     };
  //     insertIntoDatabaseFunc(newLessonInfo, false);
  //   } else {
  //     let newLessonInfo = {
  //       coaches_UID,
  //       wrestlerId,
  //       dateOfLesson: `${lessonDateYear}-${lessonDateMonth}-${lessonDateDay}`,
  //       startTime: timeConfigureForDatabaseFunc(),
  //       duration: `${durationHours}.${durationMinutes}`,
  //       notes: `Weight:${wieght} Age:${age} War:${war}`,
  //       seriesName: `CoachID${coaches_UID}WrestlerID${wrestlerId}StartDate${lessonDateYear}-${lessonDateMonth}-${lessonDateDay}EndDate${seriesEndDateYear}-${seriesEndDateMonth}-${seriesEndDateDay}Timestamp${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`,
  //     };
  //     let lessonDateForIncrement = `${lessonDateYear}, ${lessonDateMonth}, ${lessonDateDay}`;
  //     let seriesEndDateEntire = `${seriesEndDateYear}, ${seriesEndDateMonth}, ${seriesEndDateDay}`;
  //     insertIntoDatabaseFunc(
  //       newLessonInfo,
  //       true,
  //       lessonDateForIncrement,
  //       seriesEndDateEntire
  //     );
  //   }
  // };

  // let timeConfigureForDatabaseFunc = () => {
  //   return dateTimeHandlingFunctions.timeAMPMToMilitary(
  //     lessonTimeHour,
  //     lessonTimeMinute,
  //     lessonTimeAMPM
  //   );
  // };

  // let insertIntoDatabaseFunc = (
  //   lessonInfo: IPrivateLessonInfo,
  //   isASeries: boolean,
  //   lessonDateForIncrement?: string,
  //   seriesEndDateEntire?: string
  // ) => {
  //   fetch(`/api/schedulingLessons/scheduleNewPrivateLesson`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(lessonInfo),
  //   }).then((res) => {
  //     if (res.ok) {
  //       if (isASeries === false) {
  //         alert("Private lesson has been added");
  //       } else {
  //         let seriesIncrementResult: IDateIncResult | boolean =
  //           dateTimeHandlingFunctions.seriesWeeklyIncrementFunc(
  //             lessonDateForIncrement,
  //             seriesEndDateEntire
  //           );
  //         if (seriesIncrementResult) {
  //           lessonInfo.dateOfLesson = seriesIncrementResult.dateForDB;
  //           insertIntoDatabaseFunc(
  //             lessonInfo,
  //             true,
  //             seriesIncrementResult.dateForFuncLoop,
  //             seriesEndDateEntire
  //           );
  //         } else {
  //           alert("Private lesson series has been added");
  //         }
  //       }
  //     } else {
  //       alert(
  //         "Somthing went wrong! Make sure all of the information is correct."
  //       );
  //     }
  //   });
  // };

  let dateFormHTMLFunc = (setMonth: any, setDay: any, setYear: any) => {
    return (
      <>
        <select onChange={(e) => setMonth(e.target.value)}>
          <option value="">month</option>
          {monthArray.map((month) => {
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setDay(e.target.value)}>
          <option value="">day</option>
          {dayArray.map((day) => {
            return (
              <option key={day} value={day}>
                {day}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setYear(e.target.value)}>
          <option value="">year</option>
          {yearArray.map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </>
    );
  };
  /////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <div>
        <div className="mt-1">
          <label className="h4 ">Select a wrestler: </label>
          <input type="text" list="wrestler1List" onChange={onWrestlerChange} />
          <datalist id="wrestler1List">
            {personal_info.map((wrestler) => {
              return (
                <option
                  key={wrestler.user_id}
                  value={
                    wrestler.first_name +
                    " " +
                    wrestler.last_name +
                    " -+- " +
                    String(wrestler.user_id)
                  }
                ></option>
              );
            })}
          </datalist>
        </div>
      </div>

      <div>
        <h3>Lesson Date</h3>
        {dateFormHTMLFunc(
          setLessonDateMonth,
          setLessonDateDay,
          setLessonDateYear
        )}
      </div>

      <div>
        <h3>Lesson Start Time</h3>

        <label htmlFor="">start time</label>
        <select onChange={(e) => setLessonTimeHour(e.target.value)}>
          <option value=""></option>
          {hourArray.map((hour) => {
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setLessonTimeMinute(e.target.value)}>
          <option value=""></option>
          {minuteArray.map((minute) => {
            return (
              <option key={minute} value={minute}>
                {minute}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setLessonTimeAMPM(e.target.value)}>
          <option value=""></option>
          <option value="am">am</option>
          <option value="pm">pm</option>
        </select>
      </div>

      <div>
        <h3>duration hours:minutes</h3>

        <select
          onChange={(e) => setDurationHours(e.target.value)}
          defaultValue="1"
        >
          {hourArray.map((hour) => {
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => setDurationMinutes(e.target.value)}
          defaultValue="00"
        >
          {minuteArray.map((minute) => {
            return (
              <option key={minute} value={minute}>
                {minute}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <h3>series select end date</h3>
        <div>
          <p>
            series end date:{" "}
            {dateFormHTMLFunc(
              setSeriesEndDateMonth,
              setSeriesEndDateDay,
              setSeriesEndDateYear
            )}
          </p>
        </div>
      </div>

      <div>
        <h3>notes here optional:</h3>
        <div>
          <label>Weight:</label>
          <input
            className="col-1"
            maxLength={15}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            className="col-1"
            maxLength={15}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div>
          <label>WAR:</label>
          <input
            className="col-1"
            maxLength={15}
            onChange={(e) => {
              setWar(e.target.value);
            }}
          />
        </div>
      </div>

      <div>
        <button onClick={handleSubmitLessonPlan} className="btn btn-success">
          Submit Lesson
        </button>
      </div>

      <hr />

      <div>
        <CoachesFullPrivateLessonsScheduleCalendarView
          coachesId={coaches_UID}
        />
        {/* <CoachesFullPrivateLessonsSchedule coachesId={coaches_UID} /> */}
      </div>
    </div>
  );
};

export default ScheduleNewPrivateLessonForm;
