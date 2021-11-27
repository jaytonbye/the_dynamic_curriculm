// for table users

export interface IUser {
  id?: number;
  email: string;
  password: string;
  role?: string;
  real_email?: string;
  date_created?: Date;
  tenant?: string;
}

// for table personal_info
export interface IPerson {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
  user_id: number;
  date_created: Date;
}

//for table grades
export interface IGrade {
  id: number;
  video_id: number;
  coach_user_id: number;
  student_user_id: number;
  grade: number;
  movement_notes: string;
  date_created: Date;
}

//for table videos
export interface IVideo {
  id: number;
  name_of_video: string;
  url_to_video: string;
  url_to_looped_video: string;
  number_for_ordering: number;
  curriculum_level: number;
  date_created: Date;
  maximum_grade: number;
  UID: number;
}

export interface IGradesForSingleWreslterOnSpecificLevel {
  id: number;
  name_of_video: string;
  url_to_video: string;
  curriculum_level: number;
  created_at: Date;
  url_to_looped_video: string;
  number_for_ordering: number;
  grade: number;
  movement_notes: string;
}

export interface mysqlResponse {
  affectedRows: number;
  insertId: number;
}
