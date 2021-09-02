import * as mysql from "mysql";
import users from "./users";
import personal_info from "./personal_info";
import grades from "./grades";
import videos from "./videos";
import config from "../config";

export const Connection = mysql.createConnection({
  host: config.db.host,
  port: Number(config.db.port),
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

export const Query = (query: string, values?: Array<string | number>) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

export default {
  users,
  personal_info,
  grades,
  videos,
};
