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

router.post("/", hasValidCoachToken, async (req, res) => {
  let notes = req.body.notes;
  let from_coach = req.body.from_coach;
  let for_wrestler = req.body.for_wrestler;
  try {
    res.json(
      await db.coaches_notes_for_wrestlers.createNote(
        notes,
        from_coach,
        for_wrestler
      )
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
