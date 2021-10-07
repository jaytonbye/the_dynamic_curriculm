import { Query } from "./index";
import { IVideo } from "../../types";

//   id: number;
//   name_of_video: string;
//   url_to_video: string;
//   url_to_looped_video: string;
//   number_for_ordering
//   curriculum_level: number;
//   date_created: Date;

const all = async () => {
  return Query(
    "SELECT * from videos ORDER BY curriculum_level ASC, number_for_ordering ASC"
  );
};

const singleVideo = async (id: number) => {
  return Query("SELECT * FROM videos WHERE id=?", [id]);
};

const createVideo = async (video: IVideo) => {
  return Query(
    `INSERT INTO videos (name_of_video, url_to_video, url_to_looped_video, number_for_ordering, curriculum_level, maximum_grade) VALUES (?,?,?,?,?,?)`,
    [
      video.name_of_video,
      video.url_to_video,
      video.url_to_looped_video,
      video.number_for_ordering,
      video.curriculum_level,
      video.maximum_grade,
    ]
  );
};

const updateVideo = async (video: IVideo) => {
  return Query(
    `UPDATE videos SET name_of_video=?, url_to_video=?, url_to_looped_video=?, number_for_ordering=?, curriculum_level=?, maximum_grade=? WHERE id=?`,
    [
      video.name_of_video,
      video.url_to_video,
      video.url_to_looped_video,
      video.number_for_ordering,
      video.curriculum_level,
      video.maximum_grade,
      video.id,
    ]
  );
};

const deleteVideo = async (id: number) => {
  return Query(`DELETE FROM videos WHERE id=?`, [id]);
};

const deleteCorrespondingGrades = async (id: number) => {
  return Query("DELETE FROM grades WHERE video_id=?", [id]);
};

const getNumberOfVideosInEachLevel = async () => {
  return Query(
    "SELECT COUNT(*) as total_videos, curriculum_level FROM videos GROUP BY curriculum_level;"
  );
};

export default {
  all,
  singleVideo,
  createVideo,
  updateVideo,
  deleteVideo,
  deleteCorrespondingGrades,
  getNumberOfVideosInEachLevel,
};
