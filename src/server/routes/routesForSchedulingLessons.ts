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
  let token: string | any = req.headers.authorization?.split(" ")[1]; //removes bearer from the string
  let isValidToken = verify(token, config.jwt.secret);
  res.json(isValidToken);
});
router.get("/getitall", async (req, res) => {
  let responsers = await schedulingLessons.getAvails();
  res.json(responsers);
});
router.get("/getAllCoachesAndAdminsByTenant/:tenant", async (req, res) => {
  try {
    let tenant = req.params.tenant;
    let allCoachesAndAdmins =
      await schedulingLessons.getAllCoachesAndAdminsByTenant(tenant);
    res.json(allCoachesAndAdmins);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
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

router.get(
  "/getCoachesFullPrivateLessonsSchedule/:coachesId",
  async (req, res) => {
    try {
      let coachesId: string = req.params.coachesId;
      let coachesFullPrivateLessonsSchedule =
        await schedulingLessons.getCoachesFullPrivateLessonsSchedule(coachesId);
      res.json(coachesFullPrivateLessonsSchedule);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.get(
  "/getCoachesFullPrivateLessonsScheduleByWeek/:coachesId/:weekStartDate/:weekEndDate",
  async (req, res) => {
    try {
      let coachesId = req.params.coachesId;
      let weekStartDate = req.params.weekStartDate;
      let weekEndDate = req.params.weekEndDate;
      let coachesPrivateLessonsScheduleForTheSelectedWeek =
        await schedulingLessons.getCoachesFullPrivateLessonsScheduleByWeek(
          coachesId,
          weekStartDate,
          weekEndDate
        );
      res.json(coachesPrivateLessonsScheduleForTheSelectedWeek);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.get("/getPhoneNumberByUserId/:userId",async (req, res) => {
  try {
    let userId = req.params.userId
    let phoneNumber = await schedulingLessons.getPhoneNumberByUserId(userId)
    res.json(phoneNumber)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

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
    let notes = req.body.notes;
    let seriesName = req.body.seriesName;
    await schedulingLessons.postNewPrivateLesson(
      coachId,
      wrestlersId,
      dateOfLesson,
      startTime,
      duration,
      notes,
      seriesName
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/scheduleNewPrivateLessonSeriesBatch", async (req, res) => {
  try {
    let batch = req.body;
    await schedulingLessons.postNewPrivateLessonSeriesBatch(batch);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


//    PUT       //
router.put("/addPhoneNumber/:phoneNumber/:coachId", async (req, res) => {
  try {
    let phoneNumber = req.params.phoneNumber;
    let coachId = req.params.coachId;
    await schedulingLessons.putPhoneNumber(phoneNumber, coachId);
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

router.delete(
  "/deleteIndividualPrivateLesson/:privateLessonId",
  async (req, res) => {
    try {
      let privateLessonId = req.params.privateLessonId;
      await schedulingLessons.deleteIndividualPrivateLesson(privateLessonId);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.delete(
  "/deletePrivateLessonSeriesMovingForward/:seriesName/:privateLessonId",
  async (req, res) => {
    try {
      let seriesName = req.params.seriesName;
      let privateLessonId = req.params.privateLessonId;
      await schedulingLessons.deletePrivateLessonSeriesMovingForward(
        seriesName,
        privateLessonId
      );
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

export default router;
