import * as React from "react";
import * as dateTimeValues from "../ServicesForPrivateLessonScheduling/dateTimeValues";
import { useState, useEffect } from "react";
import moment from "moment";

// may need a state for month number eeg: Aug(8)

const CoachesFullPrivateLessonsScheduleCalendarView = () => {
  //   let testing = moment("2022-4-1").startOf("week").format("MM/DD/YYYY");
  //   let testing2 = moment(testing).endOf("week").format("MM/DD/YYYY");

  let [todaysDateForViewOnly, setTodaysDateForViewOnly] = useState(
    moment().format("MM/DD/YYYY")
  );
  let [todaysDate, setTodaysDate] = useState(moment().format("YYYY-MM-DD"));
  let [weekStartDate, setWeekStartDate] = useState<string>();
  let [weekEndDate, setWeekEndDate] = useState<string>();
  let [selectedMonth, setSelectedMonth] = useState(moment().format("MMMM"));
  let [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));

  useEffect(() => {
    processWeekForView(todaysDate);
  }, []);

  let processWeekForView = (dateToProcess: any) => {
    setWeekStartDate(
      moment(dateToProcess).startOf("week").format("MM/DD/YYYY")
    );
    setWeekEndDate(moment(dateToProcess).endOf("week").format("MM/DD/YYYY"));
  };

  let handleSearchMonthAndYear = (e: any) => {
    e.preventDefault();
    console.log(`m${selectedMonth}y${selectedYear}`);
  };

  let handleLeftArrowWeekCycle = () => {
    console.log("left");
  };

  let handleRightArrowWeekCycle = () => {
    console.log("right");
  };

  return (
    <div style={{ marginBottom: "20rem" }}>
      <div>Today's date: {todaysDateForViewOnly}</div>

      <div className="d-flex justify-content-center m-3 align-items-center">
        <div className="col-2 text-center">
          <select defaultValue={selectedMonth}>
            {dateTimeValues.monthsNames.map((month) => {
              return (
                <option
                  key={month}
                  id={String(dateTimeValues.monthsNames.indexOf(month) + 1)}
                  onClick={(e: any) => setSelectedMonth(e.target.value)}
                  value={month}
                >
                  {month}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-2 text-center">
          <select defaultValue={selectedYear}>
            {dateTimeValues.yearArrayValues.map((year) => {
              return (
                <option
                  key={year}
                  value={year}
                  onClick={(e: any) => setSelectedYear(e.target.value)}
                >
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleSearchMonthAndYear}>
          Search
        </button>
      </div>

      <div className="d-flex align-items-center justify-content-center text-center">
        <div className="col-1">
          <button
            className="btn btn-outline-dark left-arrow"
            onClick={handleLeftArrowWeekCycle}
          >
            {" "}
            &larr;
          </button>
        </div>

        <div>
          <div>
            <div>Showing dates:</div>
            {weekStartDate} - {weekEndDate}
          </div>
        </div>

        <div className="col-1">
          <button
            className="btn btn-outline-dark right-arrow"
            onClick={handleRightArrowWeekCycle}
          >
            {" "}
            &#8594;
          </button>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default CoachesFullPrivateLessonsScheduleCalendarView;
