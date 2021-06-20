import { Query } from "./index";
import { IVideo } from "../../types";

//   id: number;
//   name_of_video: string;
//   url_to_video: string;
//   url_to_looped_video: string;
//   curriculum_level: number;
//   date_created: Date;

const all = async () => {
  return Query("SELECT * from videos");
};

const singleVideo = async (id: number) => {
  return Query("SELECT * FROM videos WHERE id=?", [id]);
};

const createVideo = async (video: IVideo) => {
  return Query(
    `INSERT INTO videos (name_of_video, url_to_video, url_to_looped_video, curriculum_level) VALUES (?,?,?,?)`,
    [
      video.name_of_video,
      video.url_to_video,
      video.url_to_looped_video,
      video.curriculum_level,
    ]
  );
};

const updateVideo = async (video: IVideo) => {
  return Query(
    `UPDATE videos SET name_of_video=?, url_to_video=?, url_to_looped_video=?, curriculum_level WHERE id=?`,
    [
      video.name_of_video,
      video.url_to_video,
      video.url_to_looped_video,
      video.curriculum_level,
    ]
  );
};

const deleteVideo = async (id: number) => {
  return Query(`DELETE FROM videos WHERE id=?`, [id]);
};

export default {
  all,
  singleVideo,
  createVideo,
  updateVideo,
  deleteVideo,
};
