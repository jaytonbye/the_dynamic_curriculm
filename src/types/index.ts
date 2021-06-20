// for table users
export interface IUser {
  id: number;
  email: string;
  password: string;
  role: string;
  date_created: Date;
}

// for table personal_info
export interface Iperson {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
  user_id: number;
  date_created: Date;
}

//for table grades
export interface Igrade {
  id: number;
  video_id: number;
  coach_user_id: number;
  student_user_id: number;
  grade: number;
  movement_notes: string;
  date_created: Date;
}

//for table videos
export interface Ivideo {
  id: number;
  name_of_video: string;
  url_to_video: string;
  url_to_looped_video: string;
  curriculum_level: number;
  date_created: Date;
}
