import { Router } from "express";
import db from "./db";

const router = Router();

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (id) {
      res.json(await db.personal_info.singlePerson(id));
    } else {
      res.json(await db.personal_info.all());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    res.json(await db.personal_info.createPerson(req.body));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  try {
    res.json(await db.personal_info.updatePerson(req.body));
  } catch (error) {
    console.log(error);
    console.log("somethings messing up here");
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    res.json(await db.personal_info.deletePerson(id));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
