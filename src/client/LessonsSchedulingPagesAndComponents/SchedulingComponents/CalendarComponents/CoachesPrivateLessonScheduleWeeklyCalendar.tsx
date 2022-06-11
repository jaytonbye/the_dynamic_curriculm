import * as React from "react";
import classNames from "classnames";
import * as dateTimeHandlingFunctions from "../../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import { useEffect, useState } from "react";
import {
  IFullPrivateLessonsSchedule,
  IAvailabilityForCoachesId,
} from "../../ServicesForPrivateLessonScheduling/interfaces";
import * as calCssValues from "../../ServicesForPrivateLessonScheduling/CalendarCssValues";
import "./Styles/CalendarWeeklyView.scss";
import PrivateLessonCalendarDivWithPopout from "./PrivateLessonCalendarDivWithPopout";
import { convertCompilerOptionsFromJson } from "typescript";

// you should try to send the coach avail from component instead of running the fetch in here... try it again bukko
// props: IProps
const CoachesPrivateLessonScheduleWeeklyCalendar = (props: IProps) => {
  let [coachesAvailability, setCoachesAvailability] = useState<
    Array<IAvailabilityForCoachesId>
  >([]);
  let [coachesWeeklyScheduleForTheWeek, setCoachesWeeklyScheduleForTheWeek] =
    useState<Array<IFullPrivateLessonsSchedule>>(
      props.weeklyPrivateLessonsSchedule
    );
  let marginLeftMultiplyNumber = 0;
  let privateLessonDate: string;
  let privateLessonTime: string;

  // console.log(coachesAvailability);
  // console.log(coachesWeeklyScheduleForTheWeek);

  useEffect(() => {
    setCoachesWeeklyScheduleForTheWeek(props.weeklyPrivateLessonsSchedule);
    if (
      (props.coachesId > 0 && coachesAvailability === null) ||
      props.coachesId > 0
    ) {
      //did i fuck it all up?? watch fro future
      fetch(
        `/api/schedulingLessons/getCoachesWeeklyAvailibityByCoachesId/${props.coachesId}`
      )
        .then((res) => res.json())
        .then((res) => setCoachesAvailability(res));
    }
  }, [props.coachesId, props.weeklyPrivateLessonsSchedule]);

  // let funcUsedForReRender = () => {
  //   setBoolUsedOnlyToReRenderComponent(!boolUsedOnlyToReRenderComponent);
  // };

  let returnsPercentageForLessonSlotWidth = (
    dayOfWeekAsNumber: number | string,
    amountOfTimeOfMatchingTimes: any
  ) => {
    if (Number(dayOfWeekAsNumber) === calCssValues.sunAsNum) {
      //sunday
      return calCssValues.sundaySixWidth / Number(amountOfTimeOfMatchingTimes);
    }
    if (Number(dayOfWeekAsNumber) === calCssValues.monAsNum) {
      //monday
      return calCssValues.mondayZeroWdith / Number(amountOfTimeOfMatchingTimes);
    }
    if (Number(dayOfWeekAsNumber) === calCssValues.tuesAsNum) {
      //tuesday
      return calCssValues.tuesdayOneWidth / Number(amountOfTimeOfMatchingTimes);
    }
    if (Number(dayOfWeekAsNumber) === calCssValues.wedAsNum) {
      //wednesday
      return (
        calCssValues.wednesdayTwoWidth / Number(amountOfTimeOfMatchingTimes)
      );
    }
    if (Number(dayOfWeekAsNumber) === calCssValues.thursAsNum) {
      //thrus
      return (
        calCssValues.thursdayThreeWidth / Number(amountOfTimeOfMatchingTimes)
      );
    }
    if (Number(dayOfWeekAsNumber) === calCssValues.friAsNum) {
      //fri
      return calCssValues.fridayFourWidth / Number(amountOfTimeOfMatchingTimes);
    }
    if (Number(dayOfWeekAsNumber) === calCssValues.satAsNum) {
      //sat
      return (
        calCssValues.SaturdayFiveWidth / Number(amountOfTimeOfMatchingTimes)
      );
    }
  };

  let returnsMarginLeftForPrivateLessonPlacementWithinWeekday = (
    privLessonDateFuncParam: string,
    privLessonTimeFuncParam: string,
    amountOfTimesLessonOccurs: any,
    dayOfWeekAsNum: any
  ) => {
    if (amountOfTimesLessonOccurs === 1) {
      if (dayOfWeekAsNum === calCssValues.sunAsNum) {
        return 0.4;
      } //sunday
      if (dayOfWeekAsNum === calCssValues.monAsNum) {
        return 0.3;
      } //monday
      if (dayOfWeekAsNum === calCssValues.tuesAsNum) {
        return 0.4;
      } //tuesday
      if (dayOfWeekAsNum === calCssValues.wedAsNum) {
        return 0.5;
      } //wednesday
      if (dayOfWeekAsNum === calCssValues.thursAsNum) {
        return 0.9;
      } //thursday
      if (dayOfWeekAsNum === calCssValues.friAsNum) {
        return 1.2;
      } //friday
      return 3.2; //satday
    } else {
      if (
        privLessonDateFuncParam !== privateLessonDate &&
        privLessonTimeFuncParam !== privateLessonTime
      ) {
        marginLeftMultiplyNumber = 0;
        privateLessonDate = privLessonDateFuncParam;
        privateLessonTime = privLessonTimeFuncParam;
        //math here
        let widthPercentageForWeekdayConfigured: any =
          returnsPercentageForLessonSlotWidth(
            dayOfWeekAsNum,
            amountOfTimesLessonOccurs
          );
        return widthPercentageForWeekdayConfigured * marginLeftMultiplyNumber;
      } else {
        marginLeftMultiplyNumber++;
        //math here
        let widthPercentageForWeekdayConfigured: any =
          returnsPercentageForLessonSlotWidth(
            dayOfWeekAsNum,
            amountOfTimesLessonOccurs
          );
        return widthPercentageForWeekdayConfigured * marginLeftMultiplyNumber;
      }
    }
  };

  if (
    props.daysOfWeek === undefined ||
    !props.daysOfWeek[0] ||
    !props.coachesId
  ) {
    return <div>Calendar unavailable</div>;
  }

  return (
    <div className="calendar-container">
      <div className="header">
        <ul className="weekdays" style={{ margin: "0px" }}>
          <li>Sunday</li>
          <li>Monday</li>
          <li>Tuesday</li>
          <li>Wednesday</li>
          <li>Thursday</li>
          <li>Friday</li>
          <li>Saturday</li>
        </ul>

        <ul className="daynumbers" style={{ margin: "0px" }}>
          <li>{props.daysOfWeek[0]}</li>
          <li>{props.daysOfWeek[1]}</li>
          <li>{props.daysOfWeek[2]}</li>
          <li>{props.daysOfWeek[3]}</li>
          <li>{props.daysOfWeek[4]}</li>
          <li>{props.daysOfWeek[5]}</li>
          <li>{props.daysOfWeek[6]}</li>
        </ul>
      </div>

      <div className="timeslots-container">
        <ul className="timeslots" style={{ margin: "0px" }}>
          <li>
            12<sup>am</sup>
          </li>
          <li>
            12:30<sup>am</sup>
          </li>
          <li>
            1<sup>am</sup>
          </li>
          <li>
            1:30<sup>am</sup>
          </li>
          <li>
            2<sup>am</sup>
          </li>
          <li>
            2:30<sup>am</sup>
          </li>
          <li>
            3<sup>am</sup>
          </li>
          <li>
            3:30<sup>am</sup>
          </li>
          <li>
            4<sup>am</sup>
          </li>
          <li>
            4:30<sup>am</sup>
          </li>
          <li>
            5<sup>am</sup>
          </li>
          <li>
            5:30<sup>am</sup>
          </li>
          <li>
            6<sup>am</sup>
          </li>
          <li>
            6:30<sup>am</sup>
          </li>
          <li>
            7<sup>am</sup>
          </li>
          <li>
            7:30<sup>am</sup>
          </li>
          <li>
            8<sup>am</sup>
          </li>
          <li>
            8:30<sup>am</sup>
          </li>
          <li>
            9<sup>am</sup>
          </li>
          <li>
            9:30<sup>am</sup>
          </li>
          <li>
            10<sup>am</sup>
          </li>
          <li>
            10:30<sup>am</sup>
          </li>
          <li>
            11<sup>am</sup>
          </li>
          <li>
            11:30<sup>am</sup>
          </li>

          <li>
            12<sup>pm</sup>
          </li>
          <li>
            12:30<sup>pm</sup>
          </li>
          <li>
            1<sup>pm</sup>
          </li>
          <li>
            1:30<sup>pm</sup>
          </li>
          <li>
            2<sup>pm</sup>
          </li>
          <li>
            2:30<sup>pm</sup>
          </li>
          <li>
            3<sup>pm</sup>
          </li>
          <li>
            3:30<sup>pm</sup>
          </li>
          <li>
            4<sup>pm</sup>
          </li>
          <li>
            4:30<sup>pm</sup>
          </li>
          <li>
            5<sup>pm</sup>
          </li>
          <li>
            5:30<sup>pm</sup>
          </li>
          <li>
            6<sup>pm</sup>
          </li>
          <li>
            6:30<sup>pm</sup>
          </li>
          <li>
            7<sup>pm</sup>
          </li>
          <li>
            7:30<sup>pm</sup>
          </li>
          <li>
            8<sup>pm</sup>
          </li>
          <li>
            8:30<sup>pm</sup>
          </li>
          <li>
            9<sup>pm</sup>
          </li>
          <li>
            9:30<sup>pm</sup>
          </li>
          <li>
            10<sup>pm</sup>
          </li>
          <li>
            10:30<sup>pm</sup>
          </li>
          <li>
            11<sup>pm</sup>
          </li>
          <li>
            11:30<sup>pm</sup>
          </li>
        </ul>
      </div>

      <div className="event-container">
        {/* sep the days */}
        <div className="seperator-sun-mon"></div>
        <div className="seperator-mon-tue"></div>
        <div className="seperator-tue-wed"></div>
        <div className="seperator-wed-thurs"></div>
        <div className="seperator-thurs-fri"></div>
        <div className="seperator-fri-sat"></div>
        {/* <div className="seperator-sat-end"></div> */}
        {/* sep the days */}

        {/*  */}
        {/* <div className="slot test-slot" style={{ width: "8.39%" }}>
          <div className="event-status">
            <span>lesson info here</span>
          </div>
        </div>

        <div
          className="slot test-slot"
          style={{ width: "8.39%", marginLeft: "8.39%" }}
        >
          <div className="event-status">
            <span>lesson info here</span>
          </div>
        </div>

        <div
          className="slot test-slot"
          style={{ width: "8.39%", marginLeft: "8.39%" }}
        >
          <div className="event-status">
            <span>lesson info here</span>
          </div>
        </div> */}
        {/*  */}

        {!coachesAvailability || !coachesAvailability[0] ? (
          <></>
        ) : (
          coachesAvailability.map((availableDay) => {
            // console.log(
            //   dateTimeHandlingFunctions.amountOfTimeInPixelsForStyleSheetHeightCoachesAvailability(
            //     availableDay.start_time,
            //     availableDay.stop_time
            //   )
            // );
            return (
              <div
                className={`slot all-availability-slots ${availableDay.day_of_week}`}
                style={{
                  gridRow:
                    dateTimeHandlingFunctions.startTimeValueForStyleSheet(
                      availableDay.start_time
                    ),
                  height: `${dateTimeHandlingFunctions.amountOfTimeInPixelsForStyleSheetHeightCoachesAvailability(
                    availableDay.start_time,
                    availableDay.stop_time,
                    false
                  )}px`,
                }}
                key={availableDay.id}
              >
                <div>
                  <span>
                    {dateTimeHandlingFunctions.timeMilitaryToAMPM(
                      availableDay.start_time
                    )}
                    -
                    {dateTimeHandlingFunctions.timeMilitaryToAMPM(
                      availableDay.stop_time
                    )}
                  </span>
                </div>
              </div>
            );
          })
        )}

        {!coachesWeeklyScheduleForTheWeek ||
        !coachesWeeklyScheduleForTheWeek[0] ? (
          <></>
        ) : (
          coachesWeeklyScheduleForTheWeek.map((privateLesson) => {
            // usedForZIndex--;
            return (
              <div
                key={privateLesson.private_lesson_id}
                className={`slot lesson-slot private-lesson-slot weekday${
                  privateLesson.weekday_as_number
                } ${privateLesson.series_name ? "series-slot" : ""}`}
                style={{
                  position: "absolute",
                  // zIndex: usedForZIndex,
                  gridRow:
                    dateTimeHandlingFunctions.startTimeValueForStyleSheet(
                      privateLesson.start_time
                    ),
                  height: `${dateTimeHandlingFunctions.amountOfTimeInPixelsForStyleSheetHeightCoachesAvailability(
                    privateLesson.start_time,
                    privateLesson.duration,
                    true
                  )}px`,
                  width: `${returnsPercentageForLessonSlotWidth(
                    privateLesson.weekday_as_number,
                    privateLesson.amount_of_times_this_lessons_exact_date_and_time_occur
                  )}%`,
                  marginLeft: `${returnsMarginLeftForPrivateLessonPlacementWithinWeekday(
                    privateLesson.date_of_lesson,
                    privateLesson.start_time,
                    privateLesson.amount_of_times_this_lessons_exact_date_and_time_occur,
                    privateLesson.weekday_as_number
                  )}%`,
                  // marginLeft: `${
                  //   (110 /
                  //     Number(
                  //       props.amount_of_times_this_lessons_exact_date_and_time_occur
                  //     )) *
                  //   3
                  // }%`,
                  // marginLeft: 0
                }}
              >
                {
                  <PrivateLessonCalendarDivWithPopout
                    privateLesson={privateLesson}
                    boolUsedOnlyToReRenderComponentFunc={
                      props.boolFuncForReRender
                    }
                    isAdminBoolFromHeader={props.isAdminBoolFromHeader}
                    // boolUsedOnlyToReRenderComponent={
                    //   funcUsedForReRender
                    // }
                  />
                }
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  //   useEffect(() => {}, [props.weeklyPrivateLessonsSchedule]);

  //   console.log(props.weeklyPrivateLessonsSchedule);

  // if (
  //   props.weeklyPrivateLessonsSchedule === undefined ||
  //   !props.weeklyPrivateLessonsSchedule[0]
  // ) {
  //   return <div>No scheduled Lessons</div>;
  // }

  // return <div>
  //     {props.weeklyPrivateLessonsSchedule.map(privateLesson => {
  //         return(
  //             <div className="card">
  //                 <div className="card-body">
  //                     <h3 className="card-title">{privateLesson.date_of_lesson}</h3>
  //                     <p className="card-text">{privateLesson.start_time}</p>
  //                     <p className="card-text">{privateLesson.wrestler_first_name}</p>
  //                     <p className="card-text">{privateLesson.wrestler_last_name}</p>
  //                 </div>

  //             </div>
  //         )
  //     })}
  // </div>;
};

export default CoachesPrivateLessonScheduleWeeklyCalendar;

interface IProps {
  coachesId: number;
  // coachesAvailability?: IAvailabilityForCoachesId[];
  weeklyPrivateLessonsSchedule: IFullPrivateLessonsSchedule[] | any;
  daysOfWeek: string[] | any;
  propUsedOnlyForReRender?: boolean;
  boolFuncForReRender: any;
  isAdminBoolFromHeader: boolean;
}
