import moment from "moment";

const timeAMPMToMilitary = (
  hour: number | string,
  minute: number | string,
  amOrPm: string
) => {
  if (amOrPm === "pm") {
    if (Number(hour) !== 12) {
      hour = 12 + Number(hour);
    }
  } else {
    if (Number(hour) < 10) {
      hour = "0" + hour;
    }
    if (Number(hour) === 12) {
      hour = "00";
    }
  }
  return `${hour}:${minute}:00`;
};

const timeMilitaryToAMPM = (time: string) => {
  let hour: number;
  let minute: string = time.slice(3, 5);
  let amOrPm: string;
  let hourToNumber: number = Number(time.slice(0, 2));
  if (hourToNumber > 11) {
    if (hourToNumber !== 12) {
      hour = hourToNumber - 12;
    } else {
      hour = hourToNumber;
    }
    amOrPm = "pm";
  } else {
    if (hourToNumber === 0) {
      hour = 12;
    } else {
      hour = hourToNumber;
    }
    amOrPm = "am";
  }
  return `${hour}:${minute}${amOrPm}`;
};

let validateDate = (dateToValidate: string) => {
  let isDateValid = moment(dateToValidate).format("MMMM, DD, YYYY");
  // console.log(isDateValid)
  if (isDateValid === "Invalid date") {
    return false;
  } else {
    return true;
  }
};

const makesSureStartEndTimesAreValidAndOnSameDay = (
  startTime: string,
  endTimeOrDuration: string,
  isForPrivateLesson: boolean
) => {
  if (isForPrivateLesson) {
    let durationHours =
      Number(endTimeOrDuration) < 10
        ? endTimeOrDuration.slice(0, 1)
        : endTimeOrDuration.slice(0, 2);
    let totalHoursToMinutes =
      (Number(startTime.slice(0, 2)) + Number(durationHours)) * 60;
    let totalAmountOfMinutes =
      totalHoursToMinutes +
      Number(endTimeOrDuration.slice(-2)) +
      Number(startTime.slice(3, 5));
    if (Number(totalAmountOfMinutes) <= 1440) {
      return true;
    } else {
      return false;
    }
    // return false;
  } else {
    let startTimeAsNumber = Number(
      `${startTime.slice(0, 2)}${startTime.slice(3, 5)}`
    );
    let endTimeAsNumber = Number(
      `${endTimeOrDuration.slice(0, 2)}${endTimeOrDuration.slice(3, 5)}`
    );
    if (startTimeAsNumber < endTimeAsNumber) {
      return true;
    } else {
      return false;
    }
  }
};

const seriesWeeklyIncrementFunc = (
  dateToIncrement: string,
  endDate: string
) => {
  let dateToIncrementObj = new Date(dateToIncrement);
  let newDate = new Date(
    dateToIncrementObj.setDate(dateToIncrementObj.getDate() + 7)
  );
  let endDateToCompare = new Date(endDate);
  if (newDate <= endDateToCompare) {
    return {
      dateForDB: `${newDate.getFullYear()}-${
        newDate.getMonth() + 1
      }-${newDate.getDate()}`,
      dateForFuncLoop: `${newDate.getFullYear()}, ${
        newDate.getMonth() + 1
      }, ${newDate.getDate()}`,
    };
  } else {
    return false;
  }
};

//    FOR CALENDAR
let startTimeValueForStyleSheet = (startTime: string) => {
  let hour = Number(startTime.slice(0, 2));
  let minute = Number(startTime.slice(3, 5));
  let minuteIntoPercentageOfHour = String(minute / 60).slice(2, 4);
  let timeToBeMultipliedForStyleValue = Number(
    `${hour}.${minuteIntoPercentageOfHour}`
  );
  let finalResultForStylSheetStartTime =
    Math.round(timeToBeMultipliedForStyleValue * 12) + 1;
  return finalResultForStylSheetStartTime;
};

let amountOfTimeInPixelsForStyleSheetHeightCoachesAvailability = (
  startTime: string,
  endTimeOrDuration: string | number,
  isAPrivateLesson: boolean
) => {
  if (!isAPrivateLesson) {
    let startTimeHour = Number(startTime.slice(0, 2));
    let startTimeMinute = Number(startTime.slice(3, 5));
    let endTimeHour = Number(String(endTimeOrDuration).slice(0, 2));
    let endTimeMinute = Number(String(endTimeOrDuration).slice(3, 5));
    let amountOfTimeHours = (endTimeHour - startTimeHour) * 60;
    let amountOfTimeMinutes = endTimeMinute - startTimeMinute;
    return (amountOfTimeHours + amountOfTimeMinutes) * 2;
  } else {
    let durationHours =
      Number(endTimeOrDuration) < 10
        ? String(endTimeOrDuration).slice(0, 1)
        : String(endTimeOrDuration).slice(0, 2);
    let totalHoursToMinutes = Number(durationHours) * 60;
    let totalAmountOfMinutes =
      totalHoursToMinutes +
      Number(String(endTimeOrDuration).slice(-2)) +
      Number(startTime.slice(3, 5));
    return totalAmountOfMinutes * 2;
  }
};

export {
  timeAMPMToMilitary,
  timeMilitaryToAMPM,
  validateDate,
  makesSureStartEndTimesAreValidAndOnSameDay,
  seriesWeeklyIncrementFunc,
  startTimeValueForStyleSheet,
  amountOfTimeInPixelsForStyleSheetHeightCoachesAvailability,
};

interface IDateIncResult {
  dateForDB: string;
  dateForFuncLoop: string;
}
