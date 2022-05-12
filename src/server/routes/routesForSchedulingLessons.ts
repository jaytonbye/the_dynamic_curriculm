import db, { Query } from "../db";
import schedulingLessons from "../db/schedulingLessons";
import { Router } from "express";
import { hasValidCoachToken } from "../utils/tokenCheck";
import { verify, decode } from "jsonwebtoken";
import config from "../config";

const router = Router();

router.get("/getitall", async (req, res) => {
  let responsers = await schedulingLessons.getAvails();
  res.json(responsers);
});

export default router;
