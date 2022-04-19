import React, { EventHandler } from "react";

export default function SubmitNoteForWrestler(props: any) {
  const [notes, setNotes] = React.useState("not it");
  const [allUsers, setAllUsers] = React.useState([]);
  const [coachesUserInfo, setCoachesUserInfo] = React.useState([]);
  const [coachesPersonalInfo, setCoachesPersonalInfo] = React.useState([]);

  let token = sessionStorage.getItem("token");
  let UID = Number(sessionStorage.getItem("UID"));

  // Gets the coaches' user info.
  React.useEffect(() => {
    fetch(`/api/users/${UID}`)
      .then((res) => res.json())
      .then((results) => {
        setCoachesUserInfo(results);
      });
  }, []);

  // Get the coaches' personal info
  React.useEffect(() => {
    fetch(`/api/personal_info/person/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setCoachesPersonalInfo(results);
      });
  }, []);

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
              subject: `${props.wrestlerFullName} has received a message from coach ${coachesPersonalInfo[0].first_name} ${coachesPersonalInfo[0].last_name}`,
              html: `<p>Coach ${coachesPersonalInfo[0].first_name} ${coachesPersonalInfo[0].last_name} has left a message for ${props.wrestlerFullName} in the ${coachesUserInfo[0].tenant} Wrestling Curriculum. <br>
              The message is:<br></p>
              <br>
              <h4>${note}</h4>
<br>
<br>
              You can login to your account by <a href="https://dynamic-curriculum-on-heroku.herokuapp.com/login">clicking here</a> 
              
              </h4>
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
      <hr />
      <div className="d-flex justify-content-center">
        <textarea
          rows={10}
          cols={99}
          onChange={handleChange}
          placeholder="add notes"
        ></textarea>
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary my-2 w-75"
          onClick={() => {
            submitNote(notes, UID, props.wrestlerID);
          }}
        >
          Submit Note!
        </button>
      </div>
    </>
  );
}
