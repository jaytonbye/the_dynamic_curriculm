import * as express from "express";
import routesForUsers from "./routes/routesForUsers";
import routesForPersonal_info from "./routes/routesForPersonal_info";
import routesForVideos from "./routes/routesForVideos";
import routesForGrades from "./routes/routesForGrades";
import { hasValidToken } from "./utils/tokenCheck";
import Contact from "./routes/Contact";

const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  res.json("World");
});

router.use("/users", routesForUsers);
router.use("/personal_info", hasValidToken, routesForPersonal_info);
router.use("/videos", hasValidToken, routesForVideos);
router.use("/grades", hasValidToken, routesForGrades);
//router.use("/contact", Contact);

export default router;
