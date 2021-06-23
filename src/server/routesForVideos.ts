import { Router } from "express";
import db from "./db";

const router = Router();

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (req.params.id === "getlevels") {
      //My plan is to now do a fetch to http://localhost:3000/api/videos/pizza Is this a bad idea?
      res.json(await db.videos.getNumberOfVideosInEachLevel());
    } else if (id) {
      res.json(await db.videos.singleVideo(id));
    } else {
      res.json(await db.videos.all());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    res.json(await db.videos.createVideo(req.body));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  try {
    res.json(await db.videos.updateVideo(req.body));
  } catch (error) {
    console.log(error);
    console.log("somethings messed up here");
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
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
