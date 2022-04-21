import { Query } from "./index";
import { IGrade } from "../../types";

const addNewPlanToDB = async (planName, userId) => {
  return Query(
    "INSERT INTO lesson_plans(name_of_lesson_plan, created_by) values (?, ?)",
    [planName, userId]
  );
};

export default {
  addNewPlanToDB,
};
