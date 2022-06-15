import * as React from "react";
import { useEffect, useState } from "react";
import { IAllCoachesAndAdminsByTenant } from "../ServicesForPrivateLessonScheduling/interfaces";
import CoachesPrivateLessonScheduleWeeklyCalendarHeader from "./CalendarComponents/CoachesPrivateLessonScheduleWeeklyCalendarHeader";

const ViewAllCoachesSchedules = (props: IProps) => {
  let [listOfAllByTenantCoaches, setListOfAllByTenantCoaches] =
    useState<Array<IAllCoachesAndAdminsByTenant>>();
  let [selectedCoachUID, setSelectedCoachUID] = useState<number>();
  let [selectedCoachName, setSelectedCoachName] =
    useState<string>("Select a coach");

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
        <div className="text-center card col-12 col-md-11">
          <div>
            <h5>
              <u>All coaches for {props.tenant}</u>
            </h5>
          </div>
          <div className="d-flex justify-content-center flex-wrap">
            {listOfAllByTenantCoaches?.map((coach) => {
              return (
                <div
                className="col-md-3 col-12 pr-0 pl-0"
                 key={coach.user_id}>
                  <button
                    onClick={() => {
                      setSelectedCoachName(
                        `${coach.first_name} ${coach.last_name}'s`
                      );
                      setSelectedCoachUID(coach.user_id);
                    }}
                    style={{border:"solid", borderColor: "black" ,borderWidth: "1px"}}
                    className="btn btn-link mt-1 mb-1"
                  >
                    {coach.first_name} {coach.last_name}
                    <br />
                    phone: {coach.phone_number}
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
