import * as react from "react";

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

export default seriesWeeklyIncrementFunc;

export interface IDateIncResult {
  dateForDB: string;
  dateForFuncLoop: string;
}
