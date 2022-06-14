export interface IAllCoachesAndAdminsByTenant {
  user_id: number;
  role: string;
  tenant: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface IPrivateLessonInfo {
  coaches_UID: number;
  wrestlerId: number;
  dateOfLesson: string;
  startTime: string;
  duration: string;
  notes: string;
  seriesName: string | null;
}
export interface IDateIncResult {
  dateForDB: string;
  dateForFuncLoop: string;
}
export interface IAvailabilityForCoachesId {
  id: number;
  coaches_user_id: number;
  day_of_week: string;
  start_time: string;
  stop_time: string;
  date_created: number;
}

export interface IFullPrivateLessonsSchedule {
  private_lesson_id: number;
  coaches_user_id: number;
  coaches_first_name: string;
  coaches_last_name: string;
  wrestler_user_id: number;
  wrestler_first_name: string;
  wrestler_last_name: string;
  date_of_lesson: string;
  weekday_as_number: number | string;
  start_time: string;
  duration: number | string;
  amount_of_times_this_lessons_exact_date_and_time_occur: number | string;
  amount_of_times_this_lessons_exact_date_and_time_occur_minus_one:
    | number
    | string;
  series_name: string;
  notes: string;
  amountOfMatchingTimes?: number | string;
}
