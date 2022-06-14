import * as React from "react";
import { useState, useEffect } from "react";
import { IFullPrivateLessonsSchedule } from "../../ServicesForPrivateLessonScheduling/interfaces";
import moment from "moment";
import CoachesPrivateLessonScheduleWeeklyCalendar from "./../CalendarComponents/CoachesPrivateLessonScheduleWeeklyCalendar";
import PrivateLessonArchivesList from "./PrivateLessonArchivesList";
import { ContextExclusionPlugin } from "webpack";

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

  useEffect(() => {
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
      setTodaysDateToBeManipulated(
        moment(`${selectedDate}`).format(dateFormatToProcess)
      );
    }
  };

  let handleLeftArrowWeekCycle = () => {
    setTodaysDateToBeManipulated(
      moment(todaysDateToBeManipulated)
        .subtract(7, "days")
        .format(dateFormatToProcess)
    );
  };

  let handleRightArrowWeekCycle = () => {
    setTodaysDateToBeManipulated(
      moment(todaysDateToBeManipulated)
        .add(7, "days")
        .format(dateFormatToProcess)
    );
  };

  let goToTodaysDate = () => {
    setTodaysDateToBeManipulated(moment().format(dateFormatToProcess));
  };

  let returnsArrayOfNumberThatAreDaysOfTheWeekBeingViewed = (
    startOfWeekDate: string
  ) => {
    let daysOfWeekBeingViewedForCal: string[] = [];
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
        <strong onClick={goToTodaysDate} style={{ backgroundColor: "yellow" }}>
          Today's date: {todaysDateForViewOnly}
        </strong>
        <hr />
      </div>
      {props.isAdminBool && (
        <div className="d-flex justify-content-center">
          <button
            onClick={viewToggleWeeklyCalOrArchiveListView}
            className=" btn-info"
          >
            {buttonTextToToggleArcCalViews}
          </button>
        </div>
      )}
      {showOrHideWeeklyCalView && (
        <div className="text-center">
          <h5 className="mb-0 mt-1">{props.coachesName}</h5>
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

              <div className="d-flex justify-content-center flex-wrap">
                <div className="col-12">
                  <button
                    className="btn btn-secondary"
                    onClick={handleSearchMonthAndYear}
                  >
                    Search
                  </button>
                </div>
                <div
                  className="mt-1 col-12"
                  style={{ fontSize: "10px" }}
                  onClick={goToTodaysDate}
                >
                  <button><u>todays date</u></button>
                </div>
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
        {showOrHideWeeklyCalView && (
          <CoachesPrivateLessonScheduleWeeklyCalendar
            coachesId={props.coachesId}
            daysOfWeek={arrayOfNumbersEqualToDayOfWeek}
            weeklyPrivateLessonsSchedule={weeklySchedule}
            boolFuncForReRender={funcUsedForReRender}
            isAdminBoolFromHeader={props.isAdminBool}
          />
        )}

        {showOrHideArchiveOfLessonsListView && (
          <PrivateLessonArchivesList
            coachesId={props.coachesId}
            boolFuncForReRender={funcUsedForReRender}
          />
        )}
      </div>
    </div>
  );
};

export default CoachesPrivateLessonScheduleWeeklyCalendarHeader;

interface IProps {
  coachesId: number | any;
  propUsedOnlyForReRender?: boolean;
  boolForRenderFromStartPage?: boolean;
  coachesName?: string;
  isAdminBool: boolean;
}
