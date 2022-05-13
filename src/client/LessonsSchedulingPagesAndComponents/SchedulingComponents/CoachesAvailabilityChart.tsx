import * as React from "react";
import { useState, useEffect } from "react";

//note: make time deletable     havent i done this already? what the fuck was I talking about??

const CoachesAvailabilityChart = (props: ICoachIdForProp) => {
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
        getAvailabilityFunc();
      });
    }
  };

  let timeToAmPm = (time: string) => {
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
          {timeToAmPm(day.start_time)}-{timeToAmPm(day.stop_time)}
          <button value={day.id} onClick={deleteTimeSlot}>
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
      <h1>Current Availability</h1>

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

export default CoachesAvailabilityChart;

interface ICoachIdForProp {
  coachId: number;
  conditionUseForReRendering?: boolean;
}
interface IAvailabilityForCoachesId {
  id: number;
  coaches_user_id: number;
  day_of_week: string;
  start_time: string;
  stop_time: string;
  date_created: number;
}
