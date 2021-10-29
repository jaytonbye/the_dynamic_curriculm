import { Router } from "express";
import db from "../db";
import { hasValidAdminToken } from "../utils/tokenCheck";

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

router.put("/", hasValidAdminToken, async (req, res) => {
  try {
    res.json(await db.users.updateUser(req.body));
  } catch (error) {
    console.log(error);
    console.log("somethings messing up here");
    res.sendStatus(500);
  }
});

router.delete("/:id", hasValidAdminToken, async (req, res) => {
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

router.put("/passwordReset", async (req, res) => {
  let user_id = req.body.user_id;
  let newPassword = req.body.newPassword;
  try {
    res.json(await db.users.resetPassword(user_id, newPassword));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/gettingYourUser_Ids/:email", async (req, res) => {
  try {
    let email = req.params.email;
    res.json(await db.users.getAllUserIDsForPasswordReset(email));
  } catch (error) {}
});

export default router;
