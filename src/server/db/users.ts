import { Query } from "./index";
import { IUser } from "../../types";

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

const singleUser = async (id: number) => {
  return Query("SELECT * FROM users WHERE id=?", [id]);
};

const createUser = async (user: IUser) => {
  return Query(`INSERT INTO users (email, password, role) VALUES (?,?,?)`, [
    user.email,
    user.password,
    user.role,
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

export default {
  all,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
};
