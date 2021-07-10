import { Query } from "./index";
import { IUser } from "../../types";
import personal_info from "./personal_info";
import { generateHash } from "../utils/passwords";

// export interface IUser {
//   id: number;
//   email: string;
//   password: string;
//   role: string;
//   date_created: Date;
// }

const all = async () => {
  return Query("SELECT * from users");
};

const find = async (column: string, email: string) => {
  return Query(
    `Select * From users
    WHERE ??=?`,
    [column, email]
  );
};

const singleUser = async (id: number) => {
  return Query("SELECT * FROM users WHERE id=?", [id]);
};

const createUser = async (user: IUser) => {
  let hashedPassword = generateHash(user.password);
  return Query(`INSERT INTO users (email, password, role) VALUES (?,?,?)`, [
    user.email,
    hashedPassword,
    "wrestler",
  ]);
};

const updateUser = async (user: IUser) => {
  return Query(`UPDATE users SET email=?, password=?, role=? WHERE id=?`, [
    user.email,
    user.password,
    user.role,
    user.id,
  ]);
};

const deleteUser = async (id: number) => {
  return Query(`DELETE FROM users WHERE id=?`, [id]);
};

const deleteCorrespondingPersonal_info = async (id: number) => {
  return Query("DELETE FROM personal_info WHERE user_id=?", [id]);
};
const deleteCorrespondingGrades = async (id: number) => {
  return Query(
    //"DELETE FROM grades WHERE (coach_user_id=?) OR (student_user_id=?)",
    //I don't think it makes sesne to delete grades if we delete a coach (therefore I won't delete coaches). Perhaps this shouldn't have been a foreign key?
    "DELETE FROM grades WHERE student_user_id=?",
    [id, id]
  );
};

export default {
  all,
  find,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
  deleteCorrespondingGrades,
  deleteCorrespondingPersonal_info,
};
