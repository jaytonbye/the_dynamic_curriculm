import db, { Query } from "../db";
import schedulingLessons from "../db/schedulingLessons";
import { Router } from "express";
import { hasValidCoachToken } from "../utils/tokenCheck";
import { verify, decode } from "jsonwebtoken";
import config from "../config";

const router = Router();

//  GET     //
router.get("/getitall", async (req, res) => {
  let responsers = await schedulingLessons.getAvails();
  res.json(responsers);
});

//  POST    //
router.post("/postNewAvailability", async (req, res) => {
  try {
    let coachId = req.body.coaches_UID;
    let weekday = req.body.dayOfWeek;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    await schedulingLessons.postNewAvailability(
      coachId,
      weekday,
      startTime,
      endTime
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
