import * as express from "express";
import routesForUsers from "./routes/routesForUsers";
import routesForPersonal_info from "./routes/routesForPersonal_info";
import routesForVideos from "./routes/routesForVideos";
import routesForGrades from "./routes/routesForGrades";
import routesForSuccessfulLogins from "./routes/routesForSuccessfulLogins";
import { hasValidToken } from "./utils/tokenCheck";
import Contact from "./routes/Contact";
import routesForNotesFromCoachesForWrestlers from "./routes/routesForNotesFromCoachesForWrestlers";
import routesForEarnableItems from "./routes/EarnableItemsRoute";
import routesForLessonPlans from "./routes/routesForLessonPlans";

const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  res.json("World");
});

router.use("/users", routesForUsers);
router.use("/personal_info", hasValidToken, routesForPersonal_info);
router.use("/videos", hasValidToken, routesForVideos);
router.use("/grades", hasValidToken, routesForGrades);
router.use("/successfulLogins", routesForSuccessfulLogins);
router.use("/contact", Contact);
router.use(
  "/coaches_notes_for_wrestlers",
  routesForNotesFromCoachesForWrestlers
);
router.use("/earnableItems", routesForEarnableItems);
router.use("/lessonplans", routesForLessonPlans);

export default router;
