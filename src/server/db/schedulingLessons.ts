import { Query } from "./index";

const getAvails = async () => {
  return await Query("select * from coaches_availability");
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

export default {
  //  GET
  getAvails,
  //  POST
  postNewAvailability,
};
