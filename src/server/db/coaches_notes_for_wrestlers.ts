import { Query } from "./index";

const allNotes = async () => {
  return Query("SELECT * from coaches_notes_for_wrestlers");
};

const allNotesFor1Wrestler = async (wrestlerID: number) => {
  return Query(
    "Select * from coaches_notes_for_wrestlers WHERE for_wrestler=?",
    [wrestlerID]
  );
};

export default {
  allNotes,
  allNotesFor1Wrestler,
};
