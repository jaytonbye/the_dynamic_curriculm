import * as React from "react";
import * as dateTimeHandlingFunctions from "../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import { useState, useEffect } from "react";
import { IAvailabilityForCoachesId } from "../ServicesForPrivateLessonScheduling/interfaces";

//note: make time deletable     havent i done this already? what the fuck was I talking about??

const CoachAvailabilityChart = (props: ICoachIdForProp) => {
  let [availability, setAvailability] =
    useState<Array<IAvailabilityForCoachesId>>();

  useEffect(() => {
    getAvailabilityFunc();
  }, [props.conditionUseForReRendering]);

  let getAvailabilityFunc = () => {
    fetch(
      `/api/schedulingLessons/getCoachesWeeklyAvailibityByCoachesId/${props.coachId}`
    )
      .then((res) => res.json())
      .then((res) => setAvailability(res));
  };

  let deleteTimeSlot = (e: any) => {
    let areYourSureToRemove: boolean = confirm(
      "Are your sure you want to remove this time slot?"
    );
    let availabilityTimeSlot = e.target.value;
    if (areYourSureToRemove) {
      fetch(
        `/api/schedulingLessons/deleteTimeSlotAvailabilityForCoachByAvailId/${availabilityTimeSlot}`,
        {
          method: "DELETE",
        }
      ).then(() => {
        props.funcFromStartPageToChangeRenderBool()
        getAvailabilityFunc();
      });
    }
  };

  let returnsTableDataStructured = (
    availabilityParaForFunc: IAvailabilityForCoachesId[]
  ) => {
    let sunday: any[] = [];
    let monday: any[] = [];
    let tuesday: any[] = [];
    let wednesday: any[] = [];
    let thursday: any[] = [];
    let friday: any[] = [];
    let saturday: any[] = [];
    availabilityParaForFunc.map((day) => {
      let newData = (
        <div key={day.id} className="border pt-3 pb-3 text-center">
          {dateTimeHandlingFunctions.timeMilitaryToAMPM(day.start_time)}-
          {dateTimeHandlingFunctions.timeMilitaryToAMPM(day.stop_time)}
          <button
            value={day.id}
            onClick={deleteTimeSlot}
            className="btn-danger"
          >
            remove
          </button>
        </div>
      );
      if (day.day_of_week === "sunday") {
        sunday.push(newData);
      }
      if (day.day_of_week === "monday") {
        monday.push(newData);
      }
      if (day.day_of_week === "tuesday") {
        tuesday.push(newData);
      }
      if (day.day_of_week === "wednesday") {
        wednesday.push(newData);
      }
      if (day.day_of_week === "thursday") {
        thursday.push(newData);
      }
      if (day.day_of_week === "friday") {
        friday.push(newData);
      }
      if (day.day_of_week === "saturday") {
        saturday.push(newData);
      }
    });
    return (
      <>
        <td>{sunday.map((sundayMapped) => sundayMapped)}</td>
        <td>{monday.map((mondayMapped) => mondayMapped)}</td>
        <td>{tuesday.map((tuesdayMapped) => tuesdayMapped)}</td>
        <td>{wednesday.map((wednesdayMapped) => wednesdayMapped)}</td>
        <td>{thursday.map((thursdayMapped) => thursdayMapped)}</td>
        <td>{friday.map((fridayMapped) => fridayMapped)}</td>
        <td>{saturday.map((saturdayMapped) => saturdayMapped)}</td>
      </>
    );
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (!availability) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h3 className="text-center mt-2">Current availability:</h3>

      <div>
        <div className="sticky-top bg-white">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
            </thead>
            <tbody>
              <tr>{returnsTableDataStructured(availability)}</tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoachAvailabilityChart;

interface ICoachIdForProp {
  coachId: number;
  conditionUseForReRendering?: boolean;
  funcFromStartPageToChangeRenderBool: any
}
