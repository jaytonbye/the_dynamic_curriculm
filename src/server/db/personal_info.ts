import { Query } from "./index";
import { IPerson } from "../../types";

//     id: number;
//     first_name: string;
//     last_name: string;
//     notes: string;
//     user_id: number;
//     date_created: Date;

const all = async () => {
  return Query("SELECT * from personal_info");
};

const singlePerson = async (id: number) => {
  return Query("SELECT * FROM personal_info WHERE id=?", [id]);
};

const createPerson = async (person: IPerson) => {
  return Query(
    `INSERT INTO personal_info (first_name, last_name, notes, user_id) VALUES (?,?,?,?)`,
    [person.first_name, person.last_name, person.notes, person.user_id]
  );
};

const updatePerson = async (person: IPerson) => {
  return Query(
    `UPDATE personal_info SET first_name=?, last_name=?, notes=? WHERE user_id=?`,
    [person.first_name, person.last_name, person.notes, person.user_id]
  );
};

const deletePerson = async (id: number) => {
  return Query(`DELETE FROM personal_info WHERE id=?`, [id]);
};

export default {
  all,
  singlePerson,
  createPerson,
  updatePerson,
  deletePerson,
};
