import React from "react";
import Moment from "react-moment";

export default function NotesFromCoachesForWrestlers(props: any) {
  const [notes, setNotes] = React.useState([]);

  let UID = props.UID;

  React.useEffect(() => {
    fetch(`/api/coaches_notes_for_wrestlers/${UID}`)
      .then((res) => res.json())
      .then((results) => {
        setNotes(results);
      });
  }, []);



  return (
    <div>
      <h3>Recent coaching notes</h3>
      <table className="table " style={{ tableLayout: "fixed" }}>
        <thead className="sticky-top">
          <tr className="bg-light" style={{ display: "block" }}>
            <th style={{ width: "10%" }}>Date</th>
            <th style={{ width: "10%" }}>Coach ID</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody >
          {notes.map((note) => {
            return (
              <tr key={note.id} style={{ display: "block" }}>
                <td style={{ width: "10%" }}>
                  <Moment format="MM/DD/YYYY">{note.created_at}</Moment>
                </td>

                <td style={{ width: "10%" }}>{note.from_coach}</td>
                <td style={{ overflow: "hidden" }}>{note.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
