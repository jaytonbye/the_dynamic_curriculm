import { Router } from "express";
import db from "./db";

const router = Router();

//I had to put this one above the get request below, because the url was being interpreted as a variable and running that request instead. Is this a good way to do this?

// This is what a get request would look like for user_id=3 and level=1: http://localhost:3000/api/grades/gradesForSingleWreslterOnSpecificLevel/3&1
router.get(
  "/gradesForSingleWreslterOnSpecificLevel/:user_id&:level",
  async (req, res) => {
    let user_id = Number(req.params.user_id);
    let level = Number(req.params.level);
    try {
      res.json(
        await db.grades.gradesForSingleWreslterOnSpecificLevel(user_id, level)
      );
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (id) {
      res.json(await db.grades.singleGrade(id));
    } else {
      res.json(await db.grades.all());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    res.json(await db.grades.createGrade(req.body));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  try {
    res.json(await db.grades.updateGrade(req.body));
  } catch (error) {
    console.log(error);
    console.log("somethings messed up here");
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    res.json(await db.grades.deleteGrade(id));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
