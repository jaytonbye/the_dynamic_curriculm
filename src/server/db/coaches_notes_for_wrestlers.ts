import { Query } from "./index";

const allNotes = async () => {
  return Query("SELECT * from coaches_notes_for_wrestlers");
};

const allNotesFor1Wrestler = async (wrestlerID: number) => {
  return Query(
    "Select * from coaches_notes_for_wrestlers WHERE for_wrestler=? ORDER BY created_at DESC LIMIT 20;",
    [wrestlerID]
  );
};

const createNote = async (
  notes: string,
  coachID: number,
  WrestlerID: number
) => {
  return Query(
    `
    Insert INTO coaches_notes_for_wrestlers (notes,from_coach,for_wrestler)
Values (?,?,?);
    `,
    [notes, coachID, WrestlerID]
  );
};

export default {
  allNotes,
  allNotesFor1Wrestler,
  createNote,
};
