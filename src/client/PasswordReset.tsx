import React from "react";

export default function PasswordReset() {
  const [fromEmail, setFromEmail] = React.useState("");
  let subject1 = "you need to reset yo password?";
  let message1 = "i'm not going to help you reset it, so amscram";

  let handleChange = (event: any) => {
    setFromEmail(event.target.value);
  };

  const handleSubmit = (e: any) => {
    console.log("attempting fetch");
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromEmail,
          subject: subject1,
          message: message1,
        }),
      })
        .then((res) => res.json())
        .then((result) => console.log(result));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>
        We have not yet built password reset functionality. Please contact coach
        Jason, he can help you reset your password. If you can't remember your
        username, it is likely the wrestler's full name, in all lowercase
        letters, without spaces.
      </h2>
      <label>
        <strong>Email address: </strong>
      </label>
      <input
        className="m-2"
        type="text"
        onChange={handleChange}
        value={fromEmail}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Send Password Reset Link
      </button>
      <p>
        The password reset email will come from WrestleDynamic@gmail.com, it may
        go to your spam folder. If you do not receive an email within 10
        minutes, please contact us.
      </p>
    </>
  );
}
