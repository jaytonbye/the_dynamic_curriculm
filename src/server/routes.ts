import * as express from "express";
import routesForUsers from "./routes/routesForUsers";
import routesForPersonal_info from "./routes/routesForPersonal_info";
import routesForVideos from "./routes/routesForVideos";
import routesForGrades from "./routes/routesForGrades";

const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  res.json("World");
});

router.use("/users", routesForUsers);
router.use("/personal_info", routesForPersonal_info);
router.use("/videos", routesForVideos);
router.use("/grades", routesForGrades);

export default router;
