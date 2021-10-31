import { Query } from "./index";

const allLogins = async () => {
  return Query("SELECT * from successful_logins;");
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
