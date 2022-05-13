import { Query } from "./index";

//    GET           //
const getAvails = async () => {
  return await Query("select * from coaches_availability");
};

const getCoachesWeeklyAvailibityByCoachesId = async (
  coachesId: number | string
) => {
  return await Query(
    `select * from coaches_availability
   where coaches_user_id = ?
   order by 
   field(day_of_week, "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"),
   start_time asc;`,
    [coachesId]
  );
};
//      POST        //
const postNewAvailability = async (
  coachesUid: number,
  weekday: string,
  startTime: number | string,
  endTime: number | string
) => {
  return await Query(
    `insert into coaches_availability(coaches_user_id, day_of_week, start_time, stop_time)
    values (?, ?, ?, ?);`,
    [coachesUid, weekday, startTime, endTime]
  );
};

//  DELETE          //
const deleteTimeSlotAvailabilityForCoach = async (timeSlotId: number | string) => {
  return await Query(`delete from coaches_availability where id = ?;`, [
    timeSlotId,
  ]);
};

export default {
  //  GET
  getAvails,
  getCoachesWeeklyAvailibityByCoachesId,
  //  POST
  postNewAvailability,
  //  DELETE
  deleteTimeSlotAvailabilityForCoach,
};
