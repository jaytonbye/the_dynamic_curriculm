import * as React from "react";
import { useState } from "react";
import * as dateTimeHandlingFunctions from "../../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import * as calCssValues from "../../ServicesForPrivateLessonScheduling/CalendarCssValues";
import "./Styles/CalendarWeeklyView.scss";
import {
  IFullPrivateLessonsSchedule,
  IAvailabilityForCoachesId,
} from "../../ServicesForPrivateLessonScheduling/interfaces";

const PrivateLessonDivTimeSlot = (props: IProps) => {
  // let [triggersReRender, setTriggersReRender] = useState<boolean>(false);
  let [privateLessonsSlotBgColor, setPrivateLessonsSlotBgColor] =
    useState<string>("green");
  let [popupDivDisplay, setPopupDivDisplay] = useState<string>("none");
  let [zIndexForPopus, setZIndexForPopus] = useState<string>("0");

  let mouseEnteredDiv = () => {
    setPrivateLessonsSlotBgColor("blue");
    setPopupDivDisplay("block");
    setZIndexForPopus("3");
  };

  let mouseExitedDiv = () => {
    setPrivateLessonsSlotBgColor("green");
    setPopupDivDisplay("none");
    setZIndexForPopus("0");
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
      );
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
      );
      // .then(() => setTriggersReRender(!triggersReRender));
    } else {
      return;
    }
  };

  return (
    <div
      onMouseEnter={mouseEnteredDiv}
      onMouseLeave={mouseExitedDiv}
      style={{
        position: "relative",
        background: privateLessonsSlotBgColor,
        height: "100%",
        zIndex: zIndexForPopus,
      }}
    >
      <div>
        <span>
          {props.privateLesson.wrestler_first_name}{" "}
          {props.privateLesson.wrestler_last_name}{" "}
          {/* {props.privateLesson.start_time} {props.privateLesson.notes}
          {props.privateLesson.duration} */}
        </span>
      </div>

      <div className="popup-div" style={{ display: popupDivDisplay }}>
        <span>
          {props.privateLesson.wrestler_first_name}{" "}
          {props.privateLesson.wrestler_last_name}{" "}
          {props.privateLesson.start_time} {props.privateLesson.notes}
          {props.privateLesson.duration}
        </span>
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
      </div>
    </div>
  );
};

export default PrivateLessonDivTimeSlot;

interface IProps {
  privateLesson: IFullPrivateLessonsSchedule;
}
