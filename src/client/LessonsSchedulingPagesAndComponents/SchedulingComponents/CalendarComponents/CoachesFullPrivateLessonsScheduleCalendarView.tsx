import * as React from "react";
import * as dateTimeValues from "../../ServicesForPrivateLessonScheduling/dateTimeValues";
import { useState, useEffect } from "react";
import {
  IFullPrivateLessonsSchedule,
  IAvailabilityForCoachesId,
} from "../../ServicesForPrivateLessonScheduling/interfaces";
import moment from "moment";
import CalendarWeeklyViewOfScheduledLessons from "./../CalendarComponents/CalendarWeeklyViewOfScheduledLessons";

// may need a state for month number eeg: Aug(8)

const CoachesFullPrivateLessonsScheduleCalendarView = (props: IProps) => {
  //   let testing = moment("2022-4-1").startOf("week").format("MM/DD/YYYY");
  //   let testing2 = moment(testing).endOf("week").format("MM/DD/YYYY");
  let dateFormatToProcess: string = "YYYY-MM-DD";
  let dateFormatToView: string = "MMMM, DD, YYYY";

  let [todaysDateForViewOnly, setTodaysDateForViewOnly] = useState(
    moment().format(dateFormatToView)
  );
  let [todaysDateToBeManipulated, setTodaysDateToBeManipulated] = useState(
    moment().format(dateFormatToProcess)
  );
  let [weekStartDate, setWeekStartDate] = useState<string>();
  let [weekEndDate, setWeekEndDate] = useState<string>();
  let [selectedMonth, setSelectedMonth] = useState(moment().format("MM"));
  let [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  let [arrayOfNumbersEqualToDayOfWeek, setArrayOfNumbersEqualToDayOfWeek] =
    useState<string[]>();
  let [weeklySchedule, setWeeklySchedule] =
    useState<Array<IFullPrivateLessonsSchedule>>();
  // let [coachesAvailability, setCoachesAvailability] =
  //   useState<Array<IAvailabilityForCoachesId>>();

  // console.log(coachesAvailability);
  // console.log(weeklySchedule)

  useEffect(() => {
    // setCoachesAvailbilityFunc();
    processWeekForView(todaysDateToBeManipulated);
  }, [todaysDateToBeManipulated]);

  // let setCoachesAvailbilityFunc = () => {
  // console.log("ok");
  //   fetch(
  //     `/api/schedulingLessons/getCoachesWeeklyAvailibityByCoachesId/${props.coachesId}`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => setCoachesAvailability(res))
  //     .then(() => processWeekForView(todaysDateToBeManipulated));
  // };

  let processWeekForView = (dateToProcess: any) => {
    setWeekStartDate(
      moment(dateToProcess).startOf("week").format(dateFormatToView)
    );
    setWeekEndDate(
      moment(dateToProcess).endOf("week").format(dateFormatToView)
    );
    returnsArrayOfNumberThatAreDaysOfTheWeekBeingViewed(
      moment(dateToProcess).startOf("week").format(dateFormatToProcess)
    );
    getPrivateLessonsScheduleByWeek(
      moment(dateToProcess).startOf("week").format(dateFormatToProcess),
      moment(dateToProcess).endOf("week").format(dateFormatToProcess)
    );
  };

  let getPrivateLessonsScheduleByWeek = (
    weekStartDate: string,
    weekEndDate: string
  ) => {
    fetch(
      `/api/schedulingLessons/getCoachesFullPrivateLessonsScheduleByWeek/${props.coachesId}/${weekStartDate}/${weekEndDate}`
    )
      .then((res) => res.json())
      .then((res) => setWeeklySchedule(res));
  };

  let handleSearchMonthAndYear = (e: any) => {
    e.preventDefault();
    // console.log(`m${selectedMonth}y${selectedYear}`);
    setTodaysDateToBeManipulated(
      moment(`${selectedYear}-${selectedMonth}-01`).format(dateFormatToProcess)
    );
  };

  let handleLeftArrowWeekCycle = () => {
    // console.log("left");
    setTodaysDateToBeManipulated(
      moment(todaysDateToBeManipulated)
        .subtract(7, "days")
        .format(dateFormatToProcess)
    );
  };

  let handleRightArrowWeekCycle = () => {
    // console.log("right");
    setTodaysDateToBeManipulated(
      moment(todaysDateToBeManipulated)
        .add(7, "days")
        .format(dateFormatToProcess)
    );
  };

  let returnsArrayOfNumberThatAreDaysOfTheWeekBeingViewed = (
    startOfWeekDate: string
  ) => {
    let daysOfWeekBeingViewedForCal = [];
    daysOfWeekBeingViewedForCal.push(moment(startOfWeekDate).format("DD"));
    for (let i = 1; i < 7; i++) {
      daysOfWeekBeingViewedForCal.push(
        moment(startOfWeekDate).add(i, "days").format("DD")
      );
      setArrayOfNumbersEqualToDayOfWeek(daysOfWeekBeingViewedForCal);
    }
  };

  return (
    <div style={{ marginBottom: "20rem" }}>
      <div>Today's date: {todaysDateForViewOnly}</div>

      <div className="d-flex justify-content-center m-3 align-items-center">
        <div className="col-2 text-center">
          <select
            defaultValue={dateTimeValues.monthsNames[Number(selectedMonth) - 1]}
          >
            {dateTimeValues.monthsNames.map((month) => {
              return (
                <option
                  key={month}
                  id={String(
                    dateTimeValues.monthArrayValues[
                      dateTimeValues.monthsNames.indexOf(month)
                    ]
                  )}
                  onClick={(e: any) => setSelectedMonth(e.target.id)}
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
      <div>
        {/* <CalendarWeeklyViewOfScheduledLessons
          coachesId={props.coachesId}
          weeklyPrivateLessonsSchedule={weeklySchedule}
        /> */}
        {
          <CalendarWeeklyViewOfScheduledLessons
            coachesId={props.coachesId}
            daysOfWeek={arrayOfNumbersEqualToDayOfWeek}
            weeklyPrivateLessonsSchedule={weeklySchedule}
          />
        }
      </div>
    </div>
  );
};

export default CoachesFullPrivateLessonsScheduleCalendarView;

interface IProps {
  coachesId: number;
  propUsedOnlyForReRender?: boolean;
}
