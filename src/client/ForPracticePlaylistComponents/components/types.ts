export interface IAllPlans {
  id: number;
  name_of_lesson_plan: string;
  created_by: number;
  tenant: string;
  date_created: Date;
  coaches_FN: string;
  coaches_LN: string;
}

// export interface IAllVideosInPlan {
//   lpID: number;
//   planName: string;
//   createdBy: number;
//   lpvID: number;
//   lengthToDisplay: number;
//   orderNumber: number;
//   videoID: number;
//   tenant: string;
//   videoName: string;
//   videoURL: string;
//   loopedVideoURL: string;
// }

// export interface IAllVideosByTenant {
//   id: number;
//   tenant: string;
//   name_of_video: string;
//   url_to_video: string;
//   curriculum_level: string;
//   created_at: Date;
//   url_to_looped_video: string;
//   number_for_ordering: number;
//   maximum_grade: number
// }
