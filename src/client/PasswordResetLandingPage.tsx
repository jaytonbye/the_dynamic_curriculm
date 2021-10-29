import React from "react";
import { useParams, useHistory } from "react-router-dom";

export default function PasswordResetLandingPage() {
  const [newPassword1, setNewPassword1] = React.useState("");

  let { user_id } = useParams<any>();
  console.log(user_id);
  let history = useHistory();

  let handleChange = (event: any) => {
    setNewPassword1(event.target.value);
  };

  let submitNewPassword = (event: any) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: Number(user_id),
          newPassword: newPassword1,
        }),
      };
      fetch(`/api/users/passwordReset`, requestOptions)
        .then((res) => res.json())
        .then((results) => {});
      alert(
        "Your paassword has been reset. We will now redirect you to the login page"
      );
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="ml-2">New Password for username : </label>
      <input
        className="ml-2"
        type="password"
        onChange={handleChange}
        value={newPassword1}
      />
      <button className="btn btn-primary ml-2" onClick={submitNewPassword}>
        Submit new password
      </button>
    </>
  );
}
