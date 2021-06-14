import * as express from "express";

const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  res.json("World");
});

router.get("/api/users", (req, res, next) => {});

export default router;
