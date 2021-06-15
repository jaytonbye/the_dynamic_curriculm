import * as express from "express";
import routesForUsers from "./routesForUsers";

const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  res.json("World");
});

router.use("/users", routesForUsers);

export default router;
