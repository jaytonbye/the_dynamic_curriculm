import moment from "moment";
import { convertCompilerOptionsFromJson } from "typescript";
import { ContextExclusionPlugin } from "webpack";
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
    if (isASeries === false) {
      fetch(`/api/schedulingLessons/scheduleNewPrivateLesson`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonInfo),
      }).then((res) => {
        if (res.ok) {
          alert("Private lesson has been added");
          funcFromStartPageToRenderComp();
          return;
        } else {
          alert(
            //no that i validate the date it is musch less likey this code is hit and is now possibly not needed
            "Somthing went wrong! Make sure all of the information is correct."
          );
          return;
        }
      });
    } else {
      let checksIfSeriesExceedsFiveYears: boolean =
        dateTimeHandlingFunctions.makeSureSeriesDoesNotExceedFiveYears(
          lessonStartDate,
          seriesEndDate
        );
      if (checksIfSeriesExceedsFiveYears) {
        let batchedLessonsForSql: any[] = [
          [
            lessonInfo.coaches_UID,
            lessonInfo.wrestlerId,
            lessonInfo.dateOfLesson,
            lessonInfo.startTime,
            lessonInfo.duration,
            lessonInfo.notes,
            lessonInfo.seriesName,
          ],
        ];
        for (let i = true; i === true; ) {
          let seriesIncrementResult: IDateIncResult | boolean =
            dateTimeHandlingFunctions.seriesWeeklyIncrementFunc(
              lessonDateForIncrement,
              seriesEndDateEntire
            );
          // console.log(seriesIncrementResult);
          if (seriesIncrementResult) {
            let newObjToPush = [
              lessonInfo.coaches_UID,
              lessonInfo.wrestlerId,
              seriesIncrementResult.dateForDB,
              lessonInfo.startTime,
              lessonInfo.duration,
              lessonInfo.notes,
              lessonInfo.seriesName,
            ];

            lessonInfo.dateOfLesson = seriesIncrementResult.dateForDB;
            lessonDateForIncrement = seriesIncrementResult.dateForFuncLoop;
            batchedLessonsForSql.push(newObjToPush);
          } else {
            i = false;
            submitBatch(batchedLessonsForSql, funcFromStartPageToRenderComp);
          }
        }
      } else {
        alert("Series cannot exceed five years");
      }
    }
  };
  submitPrivateLessonInnerFunc();
};
let submitBatch = (batch: IPrivateLessonInfo[], reRenderFun: Function) => {
  if (batch.length > 0) {
    fetch(`/api/schedulingLessons/scheduleNewPrivateLessonSeriesBatch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(batch),
    }).then((res) => {
      if (res.ok) {
        alert("Private lesson series has been added");
        reRenderFun();
        return;
      } else {
        alert(
          "Something went wrong when tryin to submit your lesson plan series"
        );
        reRenderFun();
        return;
      }
    });
  } else {
    alert("Private lesson series has been added");
    reRenderFun();
  }
};

export { submitPrivateLessonFunc };
