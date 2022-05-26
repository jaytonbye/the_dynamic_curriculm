const timeAMPMToMilitary = (
  hour: number | string,
  minute: number | string,
  amOrPm: string
) => {
  if (amOrPm === "pm") {
    hour = 12 + Number(hour);
  } else {
    if (hour < 10) {
      hour = "0" + hour;
    }
  }
  return `${hour}:${minute}:00`;
};

const timeMilitaryToAMPM = (time: string) => {
  let hour: number;
  let minute: string = time.slice(3, 5);
  let amOrPm: string;
  let hourToNumber: number = Number(time.slice(0, 2));
  if (hourToNumber > 12) {
    hour = hourToNumber - 12;
    amOrPm = "pm";
  } else {
    hour = hourToNumber;
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

export { timeAMPMToMilitary, timeMilitaryToAMPM, seriesWeeklyIncrementFunc };

interface IDateIncResult {
  dateForDB: string;
  dateForFuncLoop: string;
}
