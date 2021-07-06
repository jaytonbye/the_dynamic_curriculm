import * as express from "express";
import apiRouter from "./routes";
import authRouter from "./routes/auth";
import * as path from "path";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use("/api", apiRouter);
app.use("/auth", authRouter);

//this sends all other routes to our react application on the front end.
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
