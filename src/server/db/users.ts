import { Query } from "./index";
import { IUser } from "../../types";
import { generateHash } from "../utils/passwords";

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
  return <Promise<any>>(
    Query(
      `INSERT INTO users (email, password, role, real_email, tenant) VALUES (?,?,?,?,?)`,
      [user.email, hashedPassword, user.role, user.real_email, user.tenant]
    )
  );
};

const updateUser = async (user: IUser) => {
  return Query(
    `UPDATE users SET email=?, password=?, role=?, real_email=? WHERE id=?`,
    [user.email, user.password, user.role, user.real_email, user.id]
  );
};

// TODO This is used to update the role only in the admin component, but I think we should add an if statement here that only allows the update to happen if the tenant of the admin matches the tenant of the user.
const updateRoleOnly = async (id: number, role: string) => {
  return Query(
    `UPDATE users SET role=? WHERE id=?`,
    [role, id]
  );
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

const resetPassword = async (id: number, password: string) => {
  let hashedPassword = generateHash(password);
  return Query(
    `UPDATE users
SET password=?
WHERE id=?`,
    [hashedPassword, id]
  );
};

const getAllUserIDsForPasswordReset = async (email: string) => {
  //in the sentence below, "email" is actually username in the database.
  return Query("SELECT * FROM users WHERE real_email=?", [email]);
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
  resetPassword,
  getAllUserIDsForPasswordReset,
  updateRoleOnly
};
