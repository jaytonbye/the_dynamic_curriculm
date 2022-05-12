import * as React from "react";
import { useState, useEffect } from "react";

const CoachesAvailabilityChart = (props: ICoachIdForProp) => {
  let [availability, setAvailability] =
    useState<Array<IAvailabilityForCoachesId>>();

  useEffect(() => {
    getAvailabilityFunc();
  }, []);

  let getAvailabilityFunc = () => {
    fetch(
      `/api/schedulingLessons/getCoachesWeeklyAvailibityByCoachesId/${props.coachId}`
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <div>
      <h1>Current Availability</h1>

      <div>
        <div className="sticky-top bg-white">
          <table className="table">
            <thead>
              <tr>
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
              <tr>
                <td></td>
              </tr>
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
}
interface IAvailabilityForCoachesId {
  id: number;
  coaches_user_id: number;
  day_of_week: string;
  start_time: number;
  stop_time: number;
  date_created: number;
}
