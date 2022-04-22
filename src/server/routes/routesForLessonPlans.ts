import db, { Query } from "../db";
import lessonPlans from "../db/lessonPlans";
import { Router } from "express";
import { hasValidCoachToken } from "../utils/tokenCheck";
import { verify, decode } from "jsonwebtoken";
import config from "../config";

const router = Router();

//      GETS
router.get("/getAllLessonPlansForUser/:createdBy", async (req, res) => {
  try {
    let createdBy = req.params.createdBy;
    let allPlansForUser = await lessonPlans.getAllLessonPlansForUser(createdBy);
    res.json(allPlansForUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get(`/getCoachName/:userId`, async (req, res) => {
  try {
    let userId = req.params.userId;
    let coachesName = await lessonPlans.getCoachName(userId);
    res.json(coachesName);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get(`/getAllVideosInPlan/:planId`, async (req, res) => {
  try {
    let planId = req.params.planId;
    let lessonPlanVideos = await lessonPlans.getAllVideosInLessonPlan(planId);
    res.json(lessonPlanVideos);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/getAllVideosByTenant/:tenant", async (req, res) => {
  try {
    let tenant = req.params.tenant;
    let allVideosByTenant = await lessonPlans.getAllVideosByTenant(tenant);
    res.json(allVideosByTenant);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/validateToketLessonPlanCreate", (req, res) => {
  // this return info provided in token
  let token = req.headers.authorization?.split(" ")[1]; //removes bearer from the string
  let isValidToken = verify(token, config.jwt.secret);
  res.json(isValidToken);
});

//      POSTS
router.post("/addNewLessonPlan", async (req, res) => {
  try {
    let planName = req.body.planName;
    let userId = req.body.userId;
    await lessonPlans.addNewPlanToDB(planName, userId);
    res.json(200);
    // res.json({userId, planName})
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post(`/addNewVideoToLessonPlan`, async (req, res) => {
  try {
    let planId = req.body.planId;
    let videoId = req.body.videoId;
    let durationOfVideo = req.body.durationOfVideo;
    let oderOfVideo = req.body.orderVideo;
    await lessonPlans.addNewVideoToLessonPlan(
      planId,
      videoId,
      durationOfVideo,
      oderOfVideo
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//    DELETEs
router.delete(
  `/deleteSingleVideoFromLessonPlan/:lessonPlanVideosID`,
  async (req, res) => {
    try {
      let lessonPlanVideosId = req.params.lessonPlanVideosID;
      await lessonPlans.deleteSingleVideoFromLessonPlan(lessonPlanVideosId);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.delete(`/deleteLessonPlan/:lessonPlanId`, async (req, res) => {
  try {
    let lessonPlanId = req.params.lessonPlanId;
    await lessonPlans.deleteAllVideoInLessonPlan(lessonPlanId);
    await lessonPlans.deleteLessonPlan(lessonPlanId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
