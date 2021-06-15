import { Query } from "./index";

const all = async () => {
  return Query("SELECT * from users");
};

export default {
  all,
};
