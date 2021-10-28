import React from "react";

export default function PasswordResetLandingPage() {
  const [newPassword1, setNewPassword1] = React.useState("");
  let handleChange = (event: any) => {
    setNewPassword1(event.target.value);
  };

  let submitNewPassword = (event: any) => {
    let user_id = 19;

    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          newPassword: newPassword1,
        }),
      };
      fetch(`/api/users/passwordReset`, requestOptions)
        .then((res) => res.json())
        .then((results) => {});
      alert("password reset!");
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
