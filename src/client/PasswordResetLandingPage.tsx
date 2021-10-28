import React from "react";

export default function PasswordResetLandingPage() {
  const [newPassword1, setNewPassword1] = React.useState("");
  let handleChange = () => {
    setNewPassword1(newPassword1);
  };

  let submitNewPassword = (event: any) => {
    let user_id = 50;
    let newPassword = "newfakepassword";

    try {
      fetch(`/passwordReset/${user_id}&${newPassword}`)
        .then((res) => res.json())
        .then((results) => {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="ml-2">New Password for username : </label>
      <input className="ml-2" type="password" onChange={handleChange} />
      <button className="btn btn-primary ml-2" onClick={submitNewPassword}>
        Submit new password
      </button>
    </>
  );
}
