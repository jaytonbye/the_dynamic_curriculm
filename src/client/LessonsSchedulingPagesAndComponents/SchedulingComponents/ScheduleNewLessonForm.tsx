import * as React from "react";
import { useState, useEffect } from "react";

// hovering over lables are triggering re render of component ... dafuq?

const ScheduleNewLessonForm = () => {
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
  let [coaches_UID, setCoaches_UID] = useState<number>(); // not inputed
  let [wrestlers_UID, setWrestlers_UID] = useState<number>();
  let [lessonDateMonth, setLessonDateMonth] = useState<number | string>();
  let [lessonDateDay, setLessonDateDay] = useState<number | string>();
  let [lessonDateYear, setLessonDateYear] = useState<number>();
  let [lessonTimeHour, setLessonTimeHour] = useState<number | string>();
  let [lessonTimeMinute, setLessonTimeMinute] = useState<number | string>();
  let [lessonTimeAMPM, setLessonTimeAMPM] = useState<string>();
  let [durationHours, setDurationHours] = useState<number | string>();
  let [durationMinutes, setDurationMinutes] = useState<number | string>();
  let [seriesStartDateMonth, setSeriesStartDateMonth] = useState<
    number | string
  >();
  let [seriesStartDateDay, setSeriesStartDateDay] = useState<number | string>();
  let [seriesStartDateYear, setSeriesStartDateYear] = useState<number>();
  let [seriesEndDateMonth, setSeriesEndDateMonth] = useState<number | string>();
  let [seriesEndDateDay, setSeriesEndDateDay] = useState<number | string>();
  let [seriesEndDateYear, setSeriesEndDateYear] = useState<number>();

  useEffect(() => {
    fetch(`/api/schedulingLessons/validateToketInputAvailability`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => setCoaches_UID(res.userId));
  }, []);

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
        <label htmlFor="">Select a wrestler:</label>
        <select></select>
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
        <h3>duration</h3>

        <select onChange={(e) => setDurationHours(e.target.value)}>
          <option value="">hours</option>
          {hourArray.map((hour) => {
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setDurationMinutes(e.target.value)}>
          <option value="">minutes</option>
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
    </div>
  );
};

export default ScheduleNewLessonForm;
