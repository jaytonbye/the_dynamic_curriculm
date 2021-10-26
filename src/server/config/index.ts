import * as dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: { secret: process.env.JWT_SECRET },
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    toEmail: process.env.MAILGUN_TO_EMAIL,
  },
};
