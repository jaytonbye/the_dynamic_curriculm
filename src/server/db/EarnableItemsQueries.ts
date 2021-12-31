import { Query } from "./index";

// INSERT INTO videos (name_of_video, url_to_video, url_to_looped_video, number_for_ordering, curriculum_level, maximum_grade, tenant) VALUES (?,?,?,?,?,?,
//     (Select tenant from users Where id=?))`

const selectAllFromEarnable = async (UID: string | number) => {
  return Query(
    `SELECT * from earnable_items where tenant = (Select tenant from users Where id=?) ORDER BY percentage_of_total_points_needed`,
    [UID]
  );
};

const insertIntoEarnablItems = async (
  userId: number,
  userId2: number,
  itemName: string,
  itemColor: string,
  PercentagePointsNeeded: number
) => {
  return Query(
    "INSERT INTO earnable_items (user_id, tenant, item_name, item_color, percentage_of_total_points_needed) VALUES (?, (Select tenant from users Where id=?), ?, ?, ?)",
    [userId, userId2, itemName, itemColor, PercentagePointsNeeded]
  );
};

const deleteFromEarnablItems = async (itemId: number | string) => {
  return Query("delete from earnable_items where id = ?;", [itemId]);
};

const selectColumnEquals = async (
  column: string,
  columnEquals: string | number
) => {
  return Query(`SELECT * from earnable_items where ??=?`, [
    column,
    columnEquals,
  ]);
};

export default {
  selectAllFromEarnable,
  insertIntoEarnablItems,
  deleteFromEarnablItems,
  selectColumnEquals,
};
