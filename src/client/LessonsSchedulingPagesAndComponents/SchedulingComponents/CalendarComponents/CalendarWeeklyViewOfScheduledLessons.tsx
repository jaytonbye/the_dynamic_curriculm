import * as React from "react";
import classNames from "classnames";
import * as dateTimeHandlingFunctions from "../../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import { useEffect, useState } from "react";
import {
  IFullPrivateLessonsSchedule,
  IAvailabilityForCoachesId,
} from "../../ServicesForPrivateLessonScheduling/interfaces";
import "./Styles/CalendarWeeklyView.scss";

// you should try to send the coach avail from component instead of running the fetch in here... try it again bukko
// props: IProps
const CalendarWeeklyViewOfScheduledLessons = (props: IProps) => {
  let [coachesAvailability, setCoachesAvailability] =
    useState<Array<IAvailabilityForCoachesId>>(null);
  let [coachesWeeklyScheduleForTheWeek, setCoachesWeeklyScheduleForTheWeek] =
    useState<Array<IFullPrivateLessonsSchedule>>(
      props.weeklyPrivateLessonsSchedule
    );
  // console.log(coachesAvailability);
  console.log(coachesWeeklyScheduleForTheWeek);

  useEffect(() => {
    setCoachesWeeklyScheduleForTheWeek(props.weeklyPrivateLessonsSchedule);
    if (props.coachesId > 0 && coachesAvailability === null) {
      fetch(
        `/api/schedulingLessons/getCoachesWeeklyAvailibityByCoachesId/${props.coachesId}`
      )
        .then((res) => res.json())
        .then((res) => setCoachesAvailability(res));
    }
  }, [props.coachesId, props.weeklyPrivateLessonsSchedule]);

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
            return (
              <div
                key={privateLesson.private_lesson_id}
                className={`slot lesson-slot private-lesson-slot weekday${privateLesson.weekday_as_number}`}
                style={{
                  gridRow:
                    dateTimeHandlingFunctions.startTimeValueForStyleSheet(
                      privateLesson.start_time
                    ),
                  height:
                    dateTimeHandlingFunctions.amountOfTimeInPixelsForStyleSheetHeightCoachesAvailability(
                      privateLesson.start_time,
                      privateLesson.duration,
                      true
                    ),
                }}
              ></div>
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

export default CalendarWeeklyViewOfScheduledLessons;

interface IProps {
  coachesId: number;
  // coachesAvailability?: IAvailabilityForCoachesId[];
  weeklyPrivateLessonsSchedule: IFullPrivateLessonsSchedule[];
  daysOfWeek: string[];
  propUsedOnlyForReRender?: boolean;
}
