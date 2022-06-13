import moment from "moment";
import * as dateTimeHandlingFunctions from "../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import {
  IPrivateLessonInfo,
  IDateIncResult,
} from "../ServicesForPrivateLessonScheduling/interfaces";

//**********refactor this func? its alot of code and may get even bigger use props and outside component ... curreclty, this code is a bit overwhelming on first look but is simple once broken down
let submitPrivateLessonFunc = (
  coaches_UID: number | any,
  wrestlerId: number | any,
  lessonStartDate: string | any,
  lessonStartTime: string | any,
  durationHours: number | string | any,
  durationMinutes: number | string | any,
  seriesEndDate: string | any,
  wieght: string | any,
  age: string | any,
  war: string | any,
  funcFromStartPageToRenderComp: Function
) => {
  let submitPrivateLessonInnerFunc = () => {
    if (!coaches_UID || !wrestlerId || !lessonStartDate || !lessonStartTime) {
      alert("fill out entire form");
    } else {
      if (seriesEndDate) {
        submitIntoServerFunc(true);
      } //series
      else {
        submitIntoServerFunc(false); //not a series
      }
    }
  };

  let submitIntoServerFunc = (conditionForSeries: boolean) => {
    let startTime = `${lessonStartTime}:00`;
    let makesSureAmountOfTimeIsValindAndIsOnlyOnOneDay =
      dateTimeHandlingFunctions.makesSureStartEndTimesAreValidAndOnSameDay(
        startTime,
        `${durationHours}.${durationMinutes}`,
        true
      );
    if (makesSureAmountOfTimeIsValindAndIsOnlyOnOneDay) {
      let newLessonInfo: IPrivateLessonInfo;
      if (!conditionForSeries) {
        newLessonInfo = {
          coaches_UID,
          wrestlerId,
          dateOfLesson: lessonStartDate,
          startTime,
          duration: `${durationHours}.${durationMinutes}`,
          notes: `Weight:${wieght} Age:${age} War:${war}`,
          seriesName: null,
        };
        insertIntoDatabaseFunc(newLessonInfo, false);
      } else {
        let newLessonInfo = {
          coaches_UID,
          wrestlerId,
          dateOfLesson: lessonStartDate,
          startTime,
          duration: `${durationHours}.${durationMinutes}`,
          notes: `Weight:${wieght} Age:${age} War:${war}`,
          seriesName: `CoachID${coaches_UID}WrestlerID${wrestlerId}StartDate${lessonStartDate}EndDate${seriesEndDate}Timestamp${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`,
        };
        // let seriesEndDateEntire = `${seriesEndDateYear}, ${seriesEndDateMonth}, ${seriesEndDateDay}`;
        let lessonDateForIncrement =
          moment(lessonStartDate).format("YYYY, MM, DD");
        let seriesEndDateEntire = moment(seriesEndDate).format("YYYY, MM, DD");
        insertIntoDatabaseFunc(
          newLessonInfo,
          true,
          lessonDateForIncrement,
          seriesEndDateEntire
        );
      }
    } else {
      alert("Invalid time: Lesson must be on same day");
    }
  };

  let insertIntoDatabaseFunc = (
    lessonInfo: IPrivateLessonInfo,
    isASeries: boolean,
    lessonDateForIncrement?: string | any,
    seriesEndDateEntire?: string | any
  ) => {
    fetch(`/api/schedulingLessons/scheduleNewPrivateLesson`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lessonInfo),
    }).then((res) => {
      if (res.ok) {
        if (isASeries === false) {
          alert("Private lesson has been added");
          funcFromStartPageToRenderComp();
        } else {
          let seriesIncrementResult: IDateIncResult | boolean =
            dateTimeHandlingFunctions.seriesWeeklyIncrementFunc(
              lessonDateForIncrement,
              seriesEndDateEntire
            );
          if (seriesIncrementResult) {
            lessonInfo.dateOfLesson = seriesIncrementResult.dateForDB;
            insertIntoDatabaseFunc(
              lessonInfo,
              true,
              seriesIncrementResult.dateForFuncLoop,
              seriesEndDateEntire
            );
          } else {
            alert("Private lesson series has been added");
            funcFromStartPageToRenderComp();
          }
        }
      } else {
        alert(
          //no that i validate the date it is musch less likey this code is hit and is now possibly not needed
          "Somthing went wrong! Make sure all of the information is correct."
        );
      }
    });
  };
  submitPrivateLessonInnerFunc();
};

export { submitPrivateLessonFunc };
