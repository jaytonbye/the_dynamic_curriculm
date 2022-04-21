import db from "../db";
import lessonPlans from "../db/lessonPlans";
import { Router } from "express";
import { hasValidCoachToken } from "../utils/tokenCheck";
import { verify, decode } from "jsonwebtoken";
import config from "../config";

const router = Router();

router.get("/validateToketLessonPlanCreate", (req, res) => {
  // this return info provided in token
  let token = req.headers.authorization?.split(" ")[1]; //removes bearer from the string
  let isValidToken = verify(token, config.jwt.secret);
  res.json(isValidToken);
});

router.post('/addNewLessonPlan', async (req, res) => {
    try {
        let planName = req.body.planName;
        let userId = req.body.userId;
        await lessonPlans.addNewPlanToDB(planName, userId)
        res.json(200)
        // res.json({userId, planName})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

export default router;
