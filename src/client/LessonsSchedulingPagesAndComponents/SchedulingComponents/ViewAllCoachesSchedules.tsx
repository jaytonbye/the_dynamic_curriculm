import * as React from "react";
import { useEffect, useState } from "react";
import { IAllCoachesAndAdminsByTenant } from "../ServicesForPrivateLessonScheduling/interfaces";
import CoachesPrivateLessonScheduleWeeklyCalendarHeader from "./CalendarComponents/CoachesPrivateLessonScheduleWeeklyCalendarHeader";

const ViewAllCoachesSchedules = (props: IProps) => {
  let [listOfAllByTenantCoaches, setListOfAllByTenantCoaches] =
    useState<Array<IAllCoachesAndAdminsByTenant>>();
  let [selectedCoachUID, setSelectedCoachUID] = useState<number>();
  let [selectedCoachName, setSelectedCoachName] = useState<string>("Select a coach");

  useEffect(() => {
    fetch(
      `/api/schedulingLessons/getAllCoachesAndAdminsByTenant/${props.tenant}`
    )
      .then((res) => res.json())
      .then((res) => setListOfAllByTenantCoaches(res));
  }, [props.tenant]);

  return (
    <div>
      <div className="mt-3 mb-3 d-flex justify-content-center">
        <div className="text-center card col-12 col-md-6">
          <div>
            <h5>
              <u>All coaches for {props.tenant}</u>
            </h5>
          </div>
          <div>
            {listOfAllByTenantCoaches?.map((coach) => {
              return (
                <div key={coach.user_id}>
                  <button
                    onClick={() => {
                      setSelectedCoachName(
                        `${coach.first_name} ${coach.last_name}'s`
                      );
                      setSelectedCoachUID(coach.user_id);
                    }}
                    className="btn btn-link"
                  >
                    {coach.first_name} {coach.last_name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CoachesPrivateLessonScheduleWeeklyCalendarHeader
        coachesId={selectedCoachUID}
        coachesName={selectedCoachName}
        isAdminBool={false}
      />
    </div>
  );
};

export default ViewAllCoachesSchedules;

interface IProps {
  tenant: string | any;
}
