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
  let [privateLessonsSlotBgColor, setPrivateLessonsSlotBgColor] =
    useState<string>("green");
    let [popupDivDisplay, setPopupDivDisplay] = useState<string>("none")

  return (
    <div
      onMouseEnter={() => {setPrivateLessonsSlotBgColor("blue") }}
      onMouseLeave={() => setPrivateLessonsSlotBgColor("green")}
      style={{ background: privateLessonsSlotBgColor, height: "100%" }}
    >
      <div>
        <span>
          {props.privateLesson.wrestler_first_name}{" "}
          {props.privateLesson.wrestler_last_name}{" "}
          {/* {props.privateLesson.start_time} {props.privateLesson.notes}
          {props.privateLesson.duration} */}
        </span>
      </div>

      <div className="popup-div"
      style={{display: popupDivDisplay}}>
        <span>
        {props.privateLesson.wrestler_first_name}{" "}
          {props.privateLesson.wrestler_last_name}{" "}
          {props.privateLesson.start_time} {props.privateLesson.notes}
          {props.privateLesson.duration}
        </span>
      </div>
      
    </div>
  );
};

export default PrivateLessonDivTimeSlot;

interface IProps {
  privateLesson: IFullPrivateLessonsSchedule;
}
