import React from "react";
import Moment from "react-moment";

export default function NotesFromCoachesForWrestlers(props: any) {
  const [notes, setNotes] = React.useState([]);

  let UID = props.UID;

  fetch(`/api/coaches_notes_for_wrestlers/${UID}`)
    .then((res) => res.json())
    .then((results) => {
      setNotes(results);
    });

  return (
    <>
      <h3>Recent coaching notes</h3>

      <table className="table ">
        <thead className="sticky-top">
          <tr className="bg-light">
            <th>Date</th>
            <th>Coach ID</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => {
            return (
              <tr key={note.id}>
                <td>
                  <Moment format="MM/DD/YYYY">{note.created_at}</Moment>
                </td>

                <td>{note.from_coach}</td>
                <td>{note.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
