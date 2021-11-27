import { Router } from "express";
import db from "../db";
import { hasValidAdminToken } from "../utils/tokenCheck";

const router = Router();

router.get("/:id?", async (req, res) => {
  let UID = Number(req.params.id);
  res.json(await db.videos.allVideosRelevantToUser(UID));
});

router.get("/blah/:id?", async (req, res) => {
  let UID = Number(req.params.id);
  try {
    if (UID) {
      res.json(await db.videos.getNumberOfVideosInEachLevel(UID));
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", hasValidAdminToken, async (req, res) => {
  try {
    res.json(await db.videos.createVideo(req.body));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/", hasValidAdminToken, async (req, res) => {
  try {
    res.json(await db.videos.updateVideo(req.body));
  } catch (error) {
    console.log(error);
    console.log("somethings messed up here");
    res.sendStatus(500);
  }
});

router.delete("/:id", hasValidAdminToken, async (req, res) => {
  let id = Number(req.params.id);
  try {
    await db.videos.deleteCorrespondingGrades(id);
    await db.videos.deleteVideo(id);
    res.json("did I delete them both?");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
