export interface IPrivateLessonInfo {
  coaches_UID: number;
  wrestlerId: number;
  dateOfLesson: string;
  startTime: string;
  duration: string;
  notes: string;
  seriesName: string;
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