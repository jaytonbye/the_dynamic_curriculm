import db from "../db";
import { Router } from "express";
import { hasValidCoachToken } from "../utils/tokenCheck";

const router = Router();

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (id) {
      res.json(await db.coaches_notes_for_wrestlers.allNotesFor1Wrestler(id));
    } else {
      res.json(await db.coaches_notes_for_wrestlers.allNotes());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
