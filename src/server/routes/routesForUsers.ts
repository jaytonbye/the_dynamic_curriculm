import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (id) {
      res.json(await db.users.singleUser(id));
    } else {
      res.json(await db.users.all());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let real_email = req.body.real_email;

    res.json(await db.users.createUser({ email, password, real_email }));
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  try {
    res.json(await db.users.updateUser(req.body));
  } catch (error) {
    console.log(error);
    console.log("somethings messing up here");
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    await db.users.deleteCorrespondingGrades(id);
    await db.users.deleteCorrespondingPersonal_info(id);
    await db.users.deleteUser(id);
    res.json(
      "hopefully deleted users after deleting corresponding personal_info and grades"
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
