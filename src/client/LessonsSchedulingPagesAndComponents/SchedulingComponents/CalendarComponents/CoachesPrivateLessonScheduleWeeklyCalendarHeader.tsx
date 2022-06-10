import * as React from "react";
import * as dateTimeValues from "../../ServicesForPrivateLessonScheduling/dateTimeValues";
import { useState, useEffect } from "react";
import {
  IFullPrivateLessonsSchedule,
  IAvailabilityForCoachesId,
} from "../../ServicesForPrivateLessonScheduling/interfaces";
import moment from "moment";
import CoachesPrivateLessonScheduleWeeklyCalendar from "./../CalendarComponents/CoachesPrivateLessonScheduleWeeklyCalendar";
import PrivateLessonArchivesList from "./PrivateLessonArchivesList";

// may need a state for month number eeg: Aug(8)

const CoachesPrivateLessonScheduleWeeklyCalendarHeader = (props: IProps) => {
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
  // let [selectedMonth, setSelectedMonth] = useState(moment().format("MM"));
  // let [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  let [selectedDate, setSelectedDate] = useState<string>();
  let [arrayOfNumbersEqualToDayOfWeek, setArrayOfNumbersEqualToDayOfWeek] =
    useState<string[]>();
  let [weeklySchedule, setWeeklySchedule] =
    useState<Array<IFullPrivateLessonsSchedule>>();
  let [showOrHideWeeklyCalView, setShowOrHideWeeklyCalView] =
    useState<boolean>(true);
  let [
    showOrHideArchiveOfLessonsListView,
    setShowOrHideArchiveOfLessonsListView,
  ] = useState<boolean>(false);
  let [buttonTextToToggleArcCalViews, setButtonTextToToggleArcCalViews] =
    useState<string>("Show archives");
  let [boolUsedOnlyToReRenderComponent, setBoolUsedOnlyToReRenderComponent] =
    useState<boolean>(true);
  let [testBool, setTestBool] = useState<boolean>(true);
  // let [coachesAvailability, setCoachesAvailability] =
  //   useState<Array<IAvailabilityForCoachesId>>();

  // console.log(coachesAvailability);
  // console.log(weeklySchedule)

  useEffect(() => {
    // setCoachesAvailbilityFunc();
    processWeekForView(todaysDateToBeManipulated);
  }, [
    todaysDateToBeManipulated,
    props.coachesId,
    boolUsedOnlyToReRenderComponent,
    props.boolForRenderFromStartPage,
  ]);

  let funcUsedForReRender = () => {
    setBoolUsedOnlyToReRenderComponent(!boolUsedOnlyToReRenderComponent);
  };

  let viewToggleWeeklyCalOrArchiveListView = () => {
    setShowOrHideWeeklyCalView(!showOrHideWeeklyCalView);
    setShowOrHideArchiveOfLessonsListView(!showOrHideArchiveOfLessonsListView);
    if (showOrHideWeeklyCalView) {
      setButtonTextToToggleArcCalViews("Show calendar");
    } else {
      setButtonTextToToggleArcCalViews("Show archives");
    }
  };

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
    if (!selectedDate) {
      alert("Select a date to search");
      return;
    } else {
      // console.log(`m${selectedMonth}y${selectedYear}`);
      setTodaysDateToBeManipulated(
        moment(`${selectedDate}`).format(dateFormatToProcess)
      );
    }
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
      <div>
        <strong>Today's date: {todaysDateForViewOnly}</strong>
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={viewToggleWeeklyCalOrArchiveListView}
          className=" btn-info"
        >
          {buttonTextToToggleArcCalViews}
        </button>
      </div>
      {showOrHideWeeklyCalView && (
        <div>
          <h2 className="text-center">
            <u>Lesson schedule</u>
          </h2>

          <div className="mt-1 mb-1 text-center d-flex justify-content-center align-items-end">
            <div className="pl-2 pr-2 pt-1 pb-1 card">
              <div>
                <h5>Search date:</h5>
                <input
                  onChange={(e: any) => setSelectedDate(e.target.value)}
                  type="date"
                />
              </div>

              <div>
                <button
                  className="btn btn-dark ml-2"
                  onClick={handleSearchMonthAndYear}
                >
                  Search
                </button>
              </div>
            </div>
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
              <div className="col-12">
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
          <div className="d-flex mt-3 mb-3 justify-content-center text-center">
            <div
              className="coaches-availability-legend ml-3 mr-3"
              style={{
                height: "30px",
                width: "70px",
                backgroundColor: "lightgray",
                borderColor: "red",
                borderStyle: "solid",
                borderWidth: "2px",
                borderRadius: "5px",
              }}
            >
              <small>Availability</small>
            </div>
            <div
              className="lesson-series-legend ml-3 mr-3"
              style={{
                height: "30px",
                width: "70px",
                backgroundColor: "limegreen",
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: "2px",
                borderRadius: "5px",
              }}
            >
              <small>Lesson</small>
            </div>
            <div
              className="private-lesson-legend ml-3 mr-3"
              style={{
                height: "30px",
                width: "70px",
                backgroundColor: "coral",
                borderColor: "aqua",
                borderStyle: "solid",
                borderWidth: "2px",
                borderRadius: "5px",
              }}
            >
              <small>Series</small>
            </div>
          </div>
        </div>
      )}
      {/*  */}
      <div>
        {/* <CalendarWeeklyViewOfScheduledLessons
          coachesId={props.coachesId}
          weeklyPrivateLessonsSchedule={weeklySchedule}
        /> */}

        {showOrHideWeeklyCalView && (
          <CoachesPrivateLessonScheduleWeeklyCalendar
            coachesId={props.coachesId}
            daysOfWeek={arrayOfNumbersEqualToDayOfWeek}
            weeklyPrivateLessonsSchedule={weeklySchedule}
            boolFuncForReRender={funcUsedForReRender}
          />
        )}

        {showOrHideArchiveOfLessonsListView && (
          <PrivateLessonArchivesList coachesId={props.coachesId} />
        )}
      </div>
    </div>
  );
};

export default CoachesPrivateLessonScheduleWeeklyCalendarHeader;

interface IProps {
  coachesId: number;
  propUsedOnlyForReRender?: boolean;
  boolForRenderFromStartPage: boolean;
}

{
  /* <select
                defaultValue={
                  dateTimeValues.monthsNames[Number(selectedMonth) - 1]
                }
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
              </select> */
}

{
  /* <select defaultValue={selectedYear}>
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
              </select> */
}
