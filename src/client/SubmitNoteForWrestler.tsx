import React, { EventHandler } from "react";

export default function SubmitNoteForWrestler(props: any) {
  const [notes, setNotes] = React.useState();

  let token = sessionStorage.getItem("token");
  let UID = Number(sessionStorage.getItem("UID"));

  let handleChange = (event: any) => {
    setNotes(event.target.value);
  };

  let submitNote = (note: string, from_coach: number, for_wrestler: number) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        notes: note,
        from_coach: from_coach,
        for_wrestler: for_wrestler,
      }),
    };
    fetch(`/api/coaches_notes_for_wrestlers`, requestOptions).then((res) => {
      if (res.ok) {
        alert(`Note submitted!`);
      } else {
        alert(
          "NOTE NOT SUBMITTED! Something went wrong. Try logging out and then logging in again. If that doesn't work, contact us"
        );
      }
    });
  };

  return (
    <>
      <label>
        <strong>
          Submit your notes for the wrestler here. It will be the first thing
          displayed when he logs in:
        </strong>
      </label>
      <textarea
        rows={10}
        cols={10}
        onChange={handleChange}
        placeholder="add notes"
      ></textarea>
      <button
        onClick={() => {
          submitNote(notes, UID, props.wrestlerID);
        }}
      >
        Submit Note!
      </button>
    </>
  );
}
