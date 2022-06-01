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

let amountOfTimeInPixelsForStyleSheet = (//this didnt end up working with the milt time instead lets use a for loop to count or somthing
  startTime: string,
  endTime: string
) => {
  let startTimeHour = Number(startTime.slice(0, 2));
  let startTimeMinute = Number(startTime.slice(3, 5));
  let endTimeHour = Number(endTime.slice(0, 2));
  let endTimeMinute = Number(endTime.slice(3, 5));
  let amountOfTimeHours = (endTimeHour - startTimeHour) * 60;
  let amountOfTimeMinutes = endTimeMinute - startTimeMinute;
  return `h ${amountOfTimeHours}m ${amountOfTimeMinutes}`;
};

export {
  timeAMPMToMilitary,
  timeMilitaryToAMPM,
  seriesWeeklyIncrementFunc,
  startTimeValueForStyleSheet,
  amountOfTimeInPixelsForStyleSheet,
};

interface IDateIncResult {
  dateForDB: string;
  dateForFuncLoop: string;
}
