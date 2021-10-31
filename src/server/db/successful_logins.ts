import { Query } from "./index";

const allLogins = async () => {
  return Query(`Select *, successful_logins.created_at as login_was_created_at from successful_logins
  JOIN personal_info ON personal_info.user_id = successful_logins.user_id;`);
};

const userLoggedIn = async (user_id: number) => {
  return Query(`INSERT INTO successful_logins (user_id) VALUES (?);`, [
    user_id,
  ]);
};

export default {
  allLogins,
  userLoggedIn,
};
