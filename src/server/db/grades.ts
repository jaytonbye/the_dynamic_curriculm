import { Query } from "./index";
import { IGrade } from "../../types";

//   id: number;
//   video_id: number;
//   coach_user_id: number;
//   student_user_id: number;
//   grade: number;
//   movement_notes: string;
//   date_created: Date;
interface IInfo {
  user_id: number;
  level: number;
}

const all = async () => {
  return Query("SELECT * from grades");
};

const singleGrade = async (id: number) => {
  return Query("SELECT * FROM grades WHERE id=?", [id]);
};

const gradesForSingleWreslterOnSpecificLevel = async (
  user_id: number,
  level: number
) => {
  return Query(
    `
    Select *, (
      Select grade from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as grade,
      (
      Select movement_notes from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as movement_notes
       from videos
      WHERE curriculum_level=?
      ORDER BY number_for_ordering;
  `,
    [user_id, user_id, level]
  );
};

const createGrade = async (grade: IGrade) => {
  return Query(
    `INSERT INTO grades (video_id, coach_user_id, student_user_id, grade, movement_notes) VALUES (?,?,?, ?, ?)`,
    [
      grade.video_id,
      grade.coach_user_id,
      grade.student_user_id,
      grade.grade,
      grade.movement_notes,
    ]
  );
};

const updateGrade = async (grade: IGrade) => {
  return Query(
    `UPDATE grades SET video_id=?, coach_user_id=?, student_user_id=?, grade=?, movement_notes=? WHERE id=?`,
    [
      grade.video_id,
      grade.coach_user_id,
      grade.student_user_id,
      grade.grade,
      grade.movement_notes,
      grade.id,
    ]
  );
};

const deleteGrade = async (id: number) => {
  return Query(`DELETE FROM grades WHERE id=?`, [id]);
};

export default {
  all,
  singleGrade,
  createGrade,
  updateGrade,
  deleteGrade,
  gradesForSingleWreslterOnSpecificLevel,
};
