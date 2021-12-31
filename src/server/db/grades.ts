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

//this query returns 1 grade for each of the movements, even movements the wrestler doesn't have graded (it returns null).
const allCurrentGradesForASingleWrestler = async (user_id: number) => {
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
    WHERE tenant=(Select tenant from users Where id=?)
    ORDER BY curriculum_level, number_for_ordering;
    `,
    [user_id, user_id, user_id]
  );
};

const allSpecificCurrentGradesForASingleWrestler = async (
  user_id: number,
  grade: number
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
      HAVING grade=?
      ORDER BY number_for_ordering
      Limit 10;
    `,
    [user_id, user_id, grade]
  );
};

const allSpecificCurrentGradesForTwoWrestlers = async (
  wrestler1Id: number,
  wrestler2Id: number,
  grade: number
) => {
  return Query(
    `
    Select *, (
      Select grade from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_1_grade,
      (
      Select movement_notes from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_1_movement_notes,
      (
      Select first_name from personal_info
      WHERE user_id=?) as wrestler_1_first_name,
      (Select last_name from personal_info
      WHERE user_id=?) as wrestler_1_last_name,
      (
      Select grade from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_2_grade,
      (
      Select movement_notes from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_2_movement_notes,
      (
      Select first_name from personal_info
      WHERE user_id=?) as wrestler_2_first_name,
      (Select last_name from personal_info
      WHERE user_id=?) as wrestler_2_last_name,
      (SELECT created_at FROM grades
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC LIMIT 1) AS wrestler_1_grade_creation_date,
      (SELECT created_at FROM grades
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC LIMIT 1) AS wrestler_2_grade_creation_date
      FROM videos
      HAVING wrestler_1_grade=? OR wrestler_2_grade=?
      ORDER BY number_for_ordering LIMIT 10;
    `,
    [
      wrestler1Id,
      wrestler1Id,
      wrestler1Id,
      wrestler1Id,
      wrestler2Id,
      wrestler2Id,
      wrestler2Id,
      wrestler2Id,
      wrestler1Id,
      wrestler2Id,
      grade,
      grade,
    ]
  );
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
      WHERE curriculum_level=? AND tenant=(Select tenant from users Where id=?)
      ORDER BY number_for_ordering;
  `,
    [user_id, user_id, level, user_id]
  );
};

const gradesForTwoWresltersOnASpecificLevel = async (
  wrestler1Id: number,
  wrestler2Id: number,
  level: number,
  coachID: number
) => {
  return Query(
    `

    Select *, (
      Select grade from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_1_grade,
      (
      Select movement_notes from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_1_movement_notes,
      (
      Select first_name from personal_info
      WHERE user_id=?) as wrestler_1_first_name,
      (Select last_name from personal_info
      WHERE user_id=?) as wrestler_1_last_name,
      (
      Select grade from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_2_grade,
      (
      Select movement_notes from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_2_movement_notes,
      (
      Select first_name from personal_info
      WHERE user_id=?) as wrestler_2_first_name,
      (Select last_name from personal_info
      WHERE user_id=?) as wrestler_2_last_name,
      (SELECT created_at FROM grades
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC LIMIT 1) AS wrestler_1_grade_creation_date,
      (
        Select coach_user_id from grades
        WHERE video_id=videos.id AND student_user_id=?
        ORDER BY grades.created_at DESC Limit 1) as wrestler_1_grade_graded_by,
      (SELECT created_at FROM grades
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC LIMIT 1) AS wrestler_2_grade_creation_date,
      (
        Select coach_user_id from grades
        WHERE video_id=videos.id AND student_user_id=?
        ORDER BY grades.created_at DESC Limit 1) as wrestler_2_grade_graded_by
      FROM videos
      WHERE curriculum_level=? AND Tenant = (Select tenant from users Where id=?)
      ORDER BY number_for_ordering;
  `,
    [
      wrestler1Id,
      wrestler1Id,
      wrestler1Id,
      wrestler1Id,
      wrestler2Id,
      wrestler2Id,
      wrestler2Id,
      wrestler2Id,
      wrestler1Id,
      wrestler1Id,
      wrestler2Id,
      wrestler2Id,
      level,
      coachID,
    ]
  );
};

const gradesForTwoWresltersOnAllLevels = async (
  wrestler1Id: number,
  wrestler2Id: number,
  coachUID: number
) => {
  return Query(
    `

    Select *, (
      Select grade from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_1_grade,
      (
      Select movement_notes from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_1_movement_notes,
      (
      Select first_name from personal_info
      WHERE user_id=?) as wrestler_1_first_name,
      (Select last_name from personal_info
      WHERE user_id=?) as wrestler_1_last_name,
      (
      Select grade from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_2_grade,
      (
      Select movement_notes from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_2_movement_notes,
      (
      Select first_name from personal_info
      WHERE user_id=?) as wrestler_2_first_name,
      (Select last_name from personal_info
      WHERE user_id=?) as wrestler_2_last_name,
      (SELECT created_at FROM grades
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC LIMIT 1) AS wrestler_1_grade_creation_date,
      (
        Select coach_user_id from grades
        WHERE video_id=videos.id AND student_user_id=?
        ORDER BY grades.created_at DESC Limit 1) as wrestler_1_grade_graded_by,
      (SELECT created_at FROM grades
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC LIMIT 1) AS wrestler_2_grade_creation_date,
      (
        Select coach_user_id from grades
        WHERE video_id=videos.id AND student_user_id=?
        ORDER BY grades.created_at DESC Limit 1) as wrestler_2_grade_graded_by
      FROM videos
      WHERE Tenant=(Select tenant from users Where id=?)
      ORDER BY curriculum_level, number_for_ordering;
  `,
    [
      wrestler1Id,
      wrestler1Id,
      wrestler1Id,
      wrestler1Id,
      wrestler2Id,
      wrestler2Id,
      wrestler2Id,
      wrestler2Id,
      wrestler1Id,
      wrestler1Id,
      wrestler2Id,
      wrestler2Id,
      coachUID,
    ]
  );
};

//on 9/10/21 at 10:45am I added in the coach who did all of the grades. It wasn't supposed to be added here, but I will leave it as it might be useful. I'm leaving this note incase it causes a breaking change.
const allGradesForTwoWreslters = async (
  wrestler1Id: number,
  wrestler2Id: number
) => {
  return Query(
    `

    Select *, (
      Select grade from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_1_grade,
      (
      Select movement_notes from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_1_movement_notes,
      (
        Select coach_user_id from grades
        WHERE video_id=videos.id AND student_user_id=?
        ORDER BY grades.created_at DESC Limit 1) as wrestler_1_grade_graded_by,
      (
      Select first_name from personal_info
      WHERE user_id=?) as wrestler_1_first_name,
      (Select last_name from personal_info
      WHERE user_id=?) as wrestler_1_last_name,
      (
      Select grade from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_2_grade,
      (
      Select movement_notes from grades 
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC Limit 1) as wrestler_2_movement_notes,
      (
        Select coach_user_id from grades
        WHERE video_id=videos.id AND student_user_id=?
        ORDER BY grades.created_at DESC Limit 1) as wrestler_2_grade_graded_by,
      (
      Select first_name from personal_info
      WHERE user_id=?) as wrestler_2_first_name,
      (Select last_name from personal_info
      WHERE user_id=?) as wrestler_2_last_name,
      (SELECT created_at FROM grades
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC LIMIT 1) AS wrestler_1_grade_creation_date,
      (SELECT created_at FROM grades
      WHERE video_id=videos.id AND student_user_id=?
      ORDER BY grades.created_at DESC LIMIT 1) AS wrestler_2_grade_creation_date
      FROM videos
      ORDER BY number_for_ordering;
  `,
    [
      wrestler1Id,
      wrestler1Id,
      wrestler1Id,
      wrestler1Id,
      wrestler1Id,
      wrestler2Id,
      wrestler2Id,
      wrestler2Id,
      wrestler2Id,
      wrestler2Id,
      wrestler1Id,
      wrestler2Id,
    ]
  );
};

//coaches currently could create grades for wrestlers who are not in their tenanacy. I would like to setup if/then logic in the SQL Statement to prevent this, but I can't figure out.
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
  gradesForTwoWresltersOnASpecificLevel,
  allSpecificCurrentGradesForASingleWrestler,
  allSpecificCurrentGradesForTwoWrestlers,
  allCurrentGradesForASingleWrestler,
  allGradesForTwoWreslters,
  gradesForTwoWresltersOnAllLevels,
};
