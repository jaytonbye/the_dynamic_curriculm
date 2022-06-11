import * as React from "react";
import { useState } from "react";
import * as dateTimeHandlingFunctions from "../../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import * as calCssValues from "../../ServicesForPrivateLessonScheduling/CalendarCssValues";
import "./Styles/CalendarWeeklyView.scss";
import {
  IFullPrivateLessonsSchedule,
  IAvailabilityForCoachesId,
} from "../../ServicesForPrivateLessonScheduling/interfaces";
import moment from "moment";

const PrivateLessonCalendarDivWithPopout = (props: IProps) => {
  // let [triggersReRender, setTriggersReRender] = useState<boolean>(false);
  let [privateLessonsSlotBgColor, setPrivateLessonsSlotBgColor] =
    useState<string>("limegreen");
  let [divTextColor, setDivTextColor] = useState<string>("black");
  let [seriesBGColor, setSeriesBGColor] = useState<string>("coral");
  let [popupDivDisplay, setPopupDivDisplay] = useState<string>("none");
  let [zIndexForPopus, setZIndexForPopus] = useState<string>("0");

  let mouseEnteredDiv = () => {
    handlePopupDiv(true);
  };

  let mouseExitedDiv = () => {
    handlePopupDiv(false);
  };

  let showOrHidePopupDiv = () => {
    if (popupDivDisplay === "none") {
      handlePopupDiv(true);
    } else {
      handlePopupDiv(false);
    }
  };

  let handlePopupDiv = (isHidden: boolean) => {
    if (isHidden) {
      setDivTextColor("white");
      setSeriesBGColor("darkblue");
      setPrivateLessonsSlotBgColor("darkblue");
      setPopupDivDisplay("block");
      setZIndexForPopus("3");
    } else {
      setDivTextColor("black");
      setSeriesBGColor("coral");
      setPrivateLessonsSlotBgColor("limegreen");
      setPopupDivDisplay("none");
      setZIndexForPopus("0");
    }
  };

  let handleCancelIndividualLesson = (e: any) => {
    e.preventDefault();
    let privateLessonId: string | number = e.target.value;
    let areYouSure = confirm(
      "Are you sure you want to delete this private lesson? This action cannot be undone."
    );
    if (areYouSure) {
      fetch(
        `/api/schedulingLessons/deleteIndividualPrivateLesson/${privateLessonId}`,
        {
          method: "DELETE",
        }
      ).then(() => props.boolUsedOnlyToReRenderComponentFunc());
      // .then(() => setTriggersReRender(!triggersReRender));
    } else {
      return;
    }
  };

  let handleCancelSeries = (e: any) => {
    e.preventDefault();
    let seriesName = e.target.id;
    let privateLessonId = e.target.value;
    let areYouSure = confirm(
      "Are you sure you want to cancel this series? This will have no affect on any previous lessons within this series"
    );
    if (areYouSure) {
      fetch(
        `/api/schedulingLessons/deletePrivateLessonSeriesMovingForward/${seriesName}/${privateLessonId}`,
        {
          method: "DELETE",
        }
      ).then(() => props.boolUsedOnlyToReRenderComponentFunc());
      // .then(() => setTriggersReRender(!triggersReRender));
    } else {
      return;
    }
  };

  return (
    <div
      className="text-center"
      onMouseEnter={mouseEnteredDiv}
      onMouseLeave={mouseExitedDiv}
      onClick={showOrHidePopupDiv}
      style={{
        position: "relative",
        color: divTextColor,
        background: `${
          props.privateLesson.series_name
            ? seriesBGColor
            : privateLessonsSlotBgColor
        }`,
        height: "100%",
        zIndex: zIndexForPopus,
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <span>
          {props.privateLesson.wrestler_first_name}{" "}
          {props.privateLesson.wrestler_last_name} <br />
          {dateTimeHandlingFunctions.timeMilitaryToAMPM(
            props.privateLesson.start_time
          )}
          {/* <br /> */}
          {/* <small>click/tap for more info</small> */}
          {/* {props.privateLesson.start_time} {props.privateLesson.notes}
          {props.privateLesson.duration} */}
        </span>
      </div>

      <div
        className="text-left popup-div"
        style={{ display: popupDivDisplay }}
        onClick={showOrHidePopupDiv}
      >
        <span>
          {props.privateLesson.wrestler_first_name} <br />
          {props.privateLesson.wrestler_last_name} <br />
          {props.privateLesson.notes}
          <br />
          {dateTimeHandlingFunctions.timeMilitaryToAMPM(
            props.privateLesson.start_time
          )}{" "}
          <br />
          {moment(props.privateLesson.date_of_lesson).format("MM/DD/YYYY")}
        </span>
        {props.isAdminBoolFromHeader && (
          <div style={{ width: "99%" }}>
            <button
              value={props.privateLesson.private_lesson_id}
              onClick={handleCancelIndividualLesson}
              className="single btn-danger ml-1 mr-1 mb-1"
            >
              Cancel lesson
            </button>

            {props.privateLesson.series_name ? (
              <button
                id={props.privateLesson.series_name}
                value={props.privateLesson.private_lesson_id}
                onClick={handleCancelSeries}
                className="series btn-danger ml-1 mr-1 mb-1"
              >
                Cancel series
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateLessonCalendarDivWithPopout;

interface IProps {
  privateLesson: IFullPrivateLessonsSchedule;
  boolUsedOnlyToReRenderComponentFunc: any;
  isAdminBoolFromHeader: boolean;
}
