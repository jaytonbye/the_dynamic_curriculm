import * as React from "react";
import { useState, useEffect } from "react";

//*****
//**********refactor? its alot of code and may get even bigger use props and outside component ... curreclty, this code is a bit overwhelming on first look but is simple once broken down
// *******

// hovering over lables are triggering re render of component ... dafuq?
// ask about foregn key
//make it look better
// test this shit = mkae sure you are adding corrent corresponding values

// ask about Since we can’t API with the WAR Zone date yet,
//we should probably add a column on the user table for “stats/info”
//where we can manually type in the wrestler’s age, weight, and WAR.

const ScheduleNewPrivateLessonForm = () => {
  let yearArray: number[] = [
    2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ];
  let monthArray: Array<number | string> = [
    "0" + 1,
    "0" + 2,
    "0" + 3,
    "0" + 4,
    "0" + 5,
    "0" + 6,
    "0" + 7,
    "0" + 8,
    "0" + 9,
    10,
    11,
    12,
  ];
  let dayArray: Array<number | string> = [
    "0" + 1,
    "0" + 2,
    "0" + 3,
    "0" + 4,
    "0" + 5,
    "0" + 6,
    "0" + 7,
    "0" + 8,
    "0" + 9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
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
  let [durationHours, setDurationHours] = useState<number | string>(2);
  let [durationMinutes, setDurationMinutes] = useState<number | string>("00");
  let [seriesStartDateMonth, setSeriesStartDateMonth] = useState<
    number | string
  >();
  let [seriesStartDateDay, setSeriesStartDateDay] = useState<number | string>();
  let [seriesStartDateYear, setSeriesStartDateYear] = useState<number>();
  let [seriesEndDateMonth, setSeriesEndDateMonth] = useState<number | string>();
  let [seriesEndDateDay, setSeriesEndDateDay] = useState<number | string>();
  let [seriesEndDateYear, setSeriesEndDateYear] = useState<number>();

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

  //makes sure everything is filled out and if its a series it then makes sure everyhting in the series section is filled out
  let handleSubmitLessonPlan = (e: any) => {
    e.preventDefault();
    if (
      !coaches_UID ||
      !wrestlerId ||
      !lessonDateMonth ||
      !lessonDateDay ||
      !lessonDateYear ||
      !lessonTimeHour ||
      !lessonTimeMinute ||
      !lessonTimeAMPM
    ) {
      alert("fill out entire form");
    } else if (
      seriesStartDateMonth ||
      seriesStartDateDay ||
      seriesStartDateYear ||
      seriesEndDateMonth ||
      seriesEndDateDay ||
      seriesEndDateYear
    ) {
      if (
        !seriesStartDateMonth ||
        !seriesStartDateDay ||
        !seriesStartDateYear ||
        !seriesEndDateMonth ||
        !seriesEndDateDay ||
        !seriesEndDateYear
      ) {
        alert("if this is a series, please complete the entire series form");
      } else {
        submitIntoServerFunc(true);
      }
    } else {
      submitIntoServerFunc(false);
    }
  };

  let submitIntoServerFunc = (conditionForSeries: boolean) => {
    let newLessonInfo: {};
    if (!conditionForSeries) {
      newLessonInfo = {
        coaches_UID,
        wrestlerId,
        dateOfLesson: `${lessonDateYear}-${lessonDateMonth}-${lessonDateDay}`,
        startTime: timeConfigureForDatabaseFunc(),
        duration: `${durationHours}.${durationMinutes}`,
        seriesStartDate: null,
        seriesEndDate: null,
      };
    } else {
      newLessonInfo = {
        coaches_UID,
        wrestlerId,
        dateOfLesson: `${lessonDateYear}-${lessonDateMonth}-${lessonDateDay}`,
        startTime: timeConfigureForDatabaseFunc(),
        duration: `${durationHours}.${durationMinutes}`,
        seriesStartDate: `${seriesStartDateYear}-${seriesStartDateMonth}-${seriesStartDateDay}`,
        seriesEndDate: `${seriesEndDateYear}-${seriesEndDateMonth}-${seriesEndDateDay}`,
      };
    }
    fetch(`/api/schedulingLessons/scheduleNewPrivateLesson`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLessonInfo),
    }).then((res) => alert("Private lesson has been added"));
  };

  let timeConfigureForDatabaseFunc = () => {
    let lessonHourFinal: number | string = lessonTimeHour;
    if (lessonTimeAMPM === "pm") {
      lessonHourFinal = 12 + Number(lessonTimeHour);
    } else {
      if (lessonTimeHour < 10) {
        lessonHourFinal = "0" + lessonTimeHour;
      }
    }
    return `${lessonHourFinal}:${lessonTimeMinute}:00`;
  };

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
          defaultValue="2"
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
        <h3>series</h3>
        <div>
          <p>
            series start date:{" "}
            {dateFormHTMLFunc(
              setSeriesStartDateMonth,
              setSeriesStartDateDay,
              setSeriesStartDateYear
            )}
          </p>
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
        <button onClick={handleSubmitLessonPlan} className="btn btn-success">
          Submit Lesson
        </button>
      </div>
    </div>
  );
};

export default ScheduleNewPrivateLessonForm;
