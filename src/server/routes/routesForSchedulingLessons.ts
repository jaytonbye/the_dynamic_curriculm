import db, { Query } from "../db";
import schedulingLessons from "../db/schedulingLessons";
import { Router } from "express";
import { hasValidCoachToken } from "../utils/tokenCheck";
import { verify, decode } from "jsonwebtoken";
import config from "../config";

const router = Router();

//  GET     //
router.get("/validateToketInputAvailability", (req, res) => {
  // this return info provided in token
  let token = req.headers.authorization?.split(" ")[1]; //removes bearer from the string
  let isValidToken = verify(token, config.jwt.secret);
  res.json(isValidToken);
});
router.get("/getitall", async (req, res) => {
  let responsers = await schedulingLessons.getAvails();
  res.json(responsers);
});
router.get(
  "/getCoachesWeeklyAvailibityByCoachesId/:coachesId",
  async (req, res) => {
    try {
      let coachesId: number | string = req.params.coachesId;
      let coachesWeeklyAvailability =
        await schedulingLessons.getCoachesWeeklyAvailibityByCoachesId(
          coachesId
        );
      res.json(coachesWeeklyAvailability);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

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

router.post("/scheduleNewPrivateLesson", async (req, res) => {
  try {
    let coachId = req.body.coaches_UID;
    let wrestlersId = req.body.wrestlerId;
    let dateOfLesson = req.body.dateOfLesson;
    let startTime = req.body.startTime;
    let duration = req.body.duration;
    let seriesName = req.body.seriesName;
    await schedulingLessons.postNewPrivateLesson(
      coachId,
      wrestlersId,
      dateOfLesson,
      startTime,
      duration,
      seriesName
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//    DELETE     //
router.delete(
  "/deleteTimeSlotAvailabilityForCoachByAvailId/:availabilityId",
  async (req, res) => {
    try {
      let availabilityId = req.params.availabilityId;
      await schedulingLessons.deleteTimeSlotAvailabilityForCoach(
        availabilityId
      );
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

export default router;
