import { Query } from "./index";
import { IGrade } from "../../types";

//  GETs
const getAllLessonPlansForUser = async (createdBy: any) => {
  return await Query("SELECT * FROM lesson_plans WHERE created_by = ?", [
    createdBy,
  ]);
};

const getCoachName =async (userId:any) => {
  return await Query(`
  select 
  p.first_name as firstName,
  p.last_name as lastName
  from personal_info p where p.user_id = ?
  `, [userId])
}

const getAllVideosInLessonPlan = async (lessonPlanId: any) => {
  return await Query(
    `
  select 
  lp.id as lpID,
  lp.name_of_lesson_plan as planName,
  lp.created_by as createdBy,
  lpv.id as lpvID,
  lpv.duration_to_display_video_in_seconds as lengthToDisplay,
  lpv.number_for_ordering as orderNumber,
  v.id as videoID,
  v.tenant as tenant,
  v.name_of_video as videoName,
  v.url_to_video as videoURL,
  v.url_to_looped_video as loopedVideoURL
  from lesson_plans lp
  join lesson_plan_videos lpv on lp.id = lpv.lesson_plan_id
  join videos v on lpv.video_id = v.id
  where lp.id = ?
  `,
    [lessonPlanId]
  );
};

const getAllVideosByTenant = async (tenant: string) => {
  return await Query("SELECT * FROM videos where tenant = ?", [tenant]);
};

//  POSTs
const addNewPlanToDB = async (planName: string, userId: number) => {
  return await Query(
    "INSERT INTO lesson_plans(name_of_lesson_plan, created_by) VALUES (?, ?)",
    [planName, userId]
  );
};

const addNewVideoToLessonPlan = async (
  planId: number,
  videoId: number,
  durationOfVideo: number,
  oderOfVideo: number
) => {
  return await Query(
    "INSERT INTO lesson_plan_videos (lesson_plan_id, video_id, duration_to_display_video_in_seconds, number_for_ordering) VALUES (?, ?, ?, ?)",
    [planId, videoId, durationOfVideo, oderOfVideo]
  );
};

//  DELETEs
const deleteSingleVideoFromLessonPlan = async (lessonPlanVideosId) => {
  return await Query("delete from lesson_plan_videos where id = ?", [
    lessonPlanVideosId,
  ]);
};

const deleteAllVideoInLessonPlan = async (lessonPlanId: any) => {
  return await Query(
    "delete from lesson_plan_videos where lesson_plan_id = ?",
    [lessonPlanId]
  );
};
const deleteLessonPlan = async (lessonPlanId: any) => {
  return await Query("delete from lesson_plans where id = ?", [lessonPlanId]);
};

export default {
  //GETs
  getAllLessonPlansForUser,
  getCoachName,
  getAllVideosByTenant,
  getAllVideosInLessonPlan,
  //POSTs
  addNewPlanToDB,
  addNewVideoToLessonPlan,
  //DELETEs
  deleteSingleVideoFromLessonPlan,
  deleteAllVideoInLessonPlan,
  deleteLessonPlan,
};
