import * as dateTimeHandlingFunctions from "../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import {
  IPrivateLessonInfo,
  IDateIncResult,
} from "../ServicesForPrivateLessonScheduling/interfaces";

//**********refactor this func? its alot of code and may get even bigger use props and outside component ... curreclty, this code is a bit overwhelming on first look but is simple once broken down
let submitPrivateLessonFunc = (
  coaches_UID: number,
  wrestlerId: number,
  lessonDateMonth: number | string,
  lessonDateDay: number | string,
  lessonDateYear: number,
  lessonTimeHour: number | string,
  lessonTimeMinute: number | string,
  lessonTimeAMPM: string,
  durationHours: number | string,
  durationMinutes: number | string,
  seriesEndDateMonth: number | string,
  seriesEndDateDay: number | string,
  seriesEndDateYear: number,
  wieght: string,
  age: string,
  war: string
) => {
  let testFunc = () => {
    if (
      !coaches_UID ||
      !wrestlerId ||
      !lessonDateMonth ||
      !lessonDateDay ||
      !lessonDateYear ||
      !lessonTimeHour ||
      !lessonTimeMinute ||
      !lessonTimeAMPM
    ) {
      alert("fill out entire form");
    } else if (seriesEndDateMonth || seriesEndDateDay || seriesEndDateYear) {
      if (!seriesEndDateMonth || !seriesEndDateDay || !seriesEndDateYear) {
        alert("if this is a series, please complete the entire series form");
      } else {
        submitIntoServerFunc(true); //series
      }
    } else {
      submitIntoServerFunc(false); //not a series
    }
  };

  let submitIntoServerFunc = (conditionForSeries: boolean) => {
    let newLessonInfo: IPrivateLessonInfo;
    if (!conditionForSeries) {
      newLessonInfo = {
        coaches_UID,
        wrestlerId,
        dateOfLesson: `${lessonDateYear}-${lessonDateMonth}-${lessonDateDay}`,
        startTime: timeConfigureForDatabaseFunc(),
        duration: `${durationHours}.${durationMinutes}`,
        notes: `Weight:${wieght} Age:${age} War:${war}`,
        seriesName: null,
      };
      insertIntoDatabaseFunc(newLessonInfo, false);
    } else {
      let newLessonInfo = {
        coaches_UID,
        wrestlerId,
        dateOfLesson: `${lessonDateYear}-${lessonDateMonth}-${lessonDateDay}`,
        startTime: timeConfigureForDatabaseFunc(),
        duration: `${durationHours}.${durationMinutes}`,
        notes: `Weight:${wieght} Age:${age} War:${war}`,
        seriesName: `CoachID${coaches_UID}WrestlerID${wrestlerId}StartDate${lessonDateYear}-${lessonDateMonth}-${lessonDateDay}EndDate${seriesEndDateYear}-${seriesEndDateMonth}-${seriesEndDateDay}Timestamp${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`,
      };
      let lessonDateForIncrement = `${lessonDateYear}, ${lessonDateMonth}, ${lessonDateDay}`;
      let seriesEndDateEntire = `${seriesEndDateYear}, ${seriesEndDateMonth}, ${seriesEndDateDay}`;
      insertIntoDatabaseFunc(
        newLessonInfo,
        true,
        lessonDateForIncrement,
        seriesEndDateEntire
      );
    }
  };

  let timeConfigureForDatabaseFunc = () => {
    return dateTimeHandlingFunctions.timeAMPMToMilitary(
      lessonTimeHour,
      lessonTimeMinute,
      lessonTimeAMPM
    );
  };

  let insertIntoDatabaseFunc = (
    lessonInfo: IPrivateLessonInfo,
    isASeries: boolean,
    lessonDateForIncrement?: string,
    seriesEndDateEntire?: string
  ) => {
    fetch(`/api/schedulingLessons/scheduleNewPrivateLesson`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lessonInfo),
    }).then((res) => {
      if (res.ok) {
        if (isASeries === false) {
          alert("Private lesson has been added");
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
          }
        }
      } else {
        alert(
          "Somthing went wrong! Make sure all of the information is correct."
        );
      }
    });
  };
  testFunc();
};

export { submitPrivateLessonFunc };
