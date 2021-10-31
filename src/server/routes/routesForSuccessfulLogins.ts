import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (id) {
      res.json(await db.successful_logins.singleUserAllLogins(id));
    } else {
      res.json(await db.successful_logins.allLogins());
    }
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
