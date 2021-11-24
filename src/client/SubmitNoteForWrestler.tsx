import React, { EventHandler } from "react";

export default function SubmitNoteForWrestler(props: any) {
  const [notes, setNotes] = React.useState("not it");
  const [allUsers, setAllUsers] = React.useState([]);

  let token = sessionStorage.getItem("token");
  let UID = Number(sessionStorage.getItem("UID"));

  let handleChange = (event: any) => {
    setNotes(event.target.value);
  };

  React.useEffect(() => {
    fetch(`/api/users`)
      .then((res) => res.json())
      .then((results) => {
        setAllUsers(results);
      });
  }, []);

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

        //Sends an email letting them know about the new note
        let wrestlerEmail = "";
        try {
          for (let x = 0; x < allUsers.length; x++) {
            if (allUsers[x].id === props.wrestlerID) {
              wrestlerEmail = allUsers[x].real_email;
            }
          }
          fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: wrestlerEmail,
              subject: `${props.wrestlerFullName} has received a message from coach ${from_coach}`,
              html: `<h4>Coach ${from_coach} has left a message for ${props.wrestlerFullName} in the Dynamic Wrestling Curriculum. You can view your message here: <a href="https://dynamic-curriculum-on-heroku.herokuapp.com/login">click here</a> or copy and paste the following web address into your browser: https://dynamic-curriculum-on-heroku.herokuapp.com/login</h4>, or you can just read the message here:
              
              ${note}
              `,
            }),
          })
            .then((res) => res.json())
            .then((result) => console.log(result));
          alert("Email sent!");
        } catch (error) {
          console.log(error);
          alert("email not sent");
        }
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
