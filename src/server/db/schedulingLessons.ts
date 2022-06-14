import { isAwaitExpression, readBuilderProgram } from "typescript";
import { Query } from "./index";

//    GET           //
const getAllCoachesAndAdminsByTenant = async (tenant: string) => {
  return await Query(
    `
    select 
      u.id as user_id,
      u.role,
      u.tenant,
      pi.first_name,
      pi.last_name,
      pi.phone_number
      from users u 
      join personal_info pi on u.id = pi.user_id
      where u.tenant = ? and (u.role = "admin" or u.role= "coach");
  `,
    [tenant]
  );
};

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

const getCoachesFullPrivateLessonsSchedule = async (
  coachesId: number | string
) => {
  return await Query(
    `
    SELECT 
    plb.id AS private_lesson_id,
    plb.coaches_user_id,
    pi.first_name AS coaches_first_name,
    pi.last_name AS coaches_last_name,
    plb.wrestler_user_id,
    (SELECT 
            pi.first_name
        FROM
            personal_info pi
        WHERE
            plb.wrestler_user_id = pi.user_id) AS wrestler_first_name,
    (SELECT 
            pi.last_name
        FROM
            personal_info pi
        WHERE
            plb.wrestler_user_id = pi.user_id) AS wrestler_last_name,
    plb.date_of_lesson,
    plb.start_time,
    plb.duration,
    plb.series_name,
    plb.notes
    FROM private_lesson_bookings plb
    JOIN personal_info pi ON plb.coaches_user_id = pi.user_id
    WHERE plb.coaches_user_id = ?
    ORDER BY plb.date_of_lesson, plb.start_time;
    `,
    [coachesId]
  );
};

const getCoachesFullPrivateLessonsScheduleByWeek = async (
  coachesId: number | string,
  weekStartDate: string,
  weekEndDate: string
) => {
  return await Query(
    `
    SELECT 
    plb.id AS private_lesson_id,
    plb.coaches_user_id,
    pi.first_name AS coaches_first_name,
    pi.last_name AS coaches_last_name,
    plb.wrestler_user_id,
    (SELECT 
            pi.first_name
        FROM
            personal_info pi
        WHERE
            plb.wrestler_user_id = pi.user_id) AS wrestler_first_name,
    (SELECT 
            pi.last_name
        FROM
            personal_info pi
        WHERE
            plb.wrestler_user_id = pi.user_id) AS wrestler_last_name,
    plb.date_of_lesson,
    WEEKDAY(plb.date_of_lesson) as weekday_as_number,
    plb.start_time,
    plb.duration,
    (select count(*) from private_lesson_bookings pb
        where pb.date_of_lesson = plb.date_of_lesson
        and pb.start_time = plb.start_time  and pb.coaches_user_id = ?) as amount_of_times_this_lessons_exact_date_and_time_occur,
    (select count(*) -1 from private_lesson_bookings pb
        where pb.date_of_lesson = plb.date_of_lesson
        and pb.start_time = plb.start_time) as amount_of_times_this_lessons_exact_date_and_time_occur_minus_one,
    plb.series_name,
    plb.notes
FROM
    private_lesson_bookings plb
        JOIN
    personal_info pi ON plb.coaches_user_id = pi.user_id
WHERE
    plb.coaches_user_id = ?
    and date_of_lesson>=date(?) 
    and date_of_lesson<=date(?)
    ORDER BY plb.date_of_lesson, plb.start_time;
  `,
    [coachesId, coachesId, weekStartDate, weekEndDate]
  );
};

const getPhoneNumberByUserId = async (userId: string) => {
  return await Query(`select phone_number from personal_info where user_id = ?;`, [
    userId,
  ]);
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

const postNewPrivateLesson = async (
  coachId: number | string,
  wrestlerId: number | string,
  dateOfLesson: number | string,
  startTime: number | string,
  duration: number | string,
  notes: string,
  seriesName: string
) => {
  return await Query(
    `insert into private_lesson_bookings(coaches_user_id, wrestler_user_id,
    date_of_lesson, start_time, duration, notes, series_name)
    values(?, ?, ?, ?, ?, ?, ?);`,
    [coachId, wrestlerId, dateOfLesson, startTime, duration, notes, seriesName]
  );
};

const postNewPrivateLessonSeriesBatch = async (values: any) => {
  return await Query(
    `insert into private_lesson_bookings(coaches_user_id, wrestler_user_id,
    date_of_lesson, start_time, duration, notes, series_name)
    values ?`,
    [values]
  );
};

//  PUT              //
const putPhoneNumber = async (phoneNumber: string, coachId: string) => {
  return await Query(
    `
      UPDATE personal_info
      SET phone_number = ?
      where user_id = ?;`,
    [phoneNumber, coachId]
  );
};

//  DELETE          //
const deleteTimeSlotAvailabilityForCoach = async (
  timeSlotId: number | string
) => {
  return await Query(`delete from coaches_availability where id = ?;`, [
    timeSlotId,
  ]);
};

const deleteIndividualPrivateLesson = async (
  privateLessonId: number | string
) => {
  return await Query(
    `
  delete from private_lesson_bookings where id = ?;`,
    [privateLessonId]
  );
};

const deletePrivateLessonSeriesMovingForward = async (
  seriesName: string,
  privateLessonId: string | number
) => {
  return await Query(
    `delete from private_lesson_bookings
  where series_name = ? and id >= ?;`,
    [seriesName, privateLessonId]
  );
};

export default {
  //  GET
  getAllCoachesAndAdminsByTenant,
  getAvails,
  getCoachesWeeklyAvailibityByCoachesId,
  getCoachesFullPrivateLessonsSchedule,
  getCoachesFullPrivateLessonsScheduleByWeek,
  getPhoneNumberByUserId,
  //  POST
  postNewAvailability,
  postNewPrivateLesson,
  postNewPrivateLessonSeriesBatch,
  //  PUT
  putPhoneNumber,
  //  DELETE
  deleteTimeSlotAvailabilityForCoach,
  deleteIndividualPrivateLesson,
  deletePrivateLessonSeriesMovingForward,
};
