import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/", async (req, res) => {
  let id = Number(req.params.id);
  try {
    res.json(await db.successful_logins.allLogins());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//not setup yet:
router.post("/", async (req, res) => {
  try {
    res.json(await db.successful_logins.userLoggedIn(req.body.user_id));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
