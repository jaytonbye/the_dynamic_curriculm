import React from "react";
const CryptoJS = require("crypto-js");

export default function PasswordReset() {
  const [emailToReset, setEmailToReset] = React.useState("");
  const [arrayOfUsers, setArrayOfUsers] = React.useState([]);
  let subject1 = "The Dynamic Wrestling Curriculum - Password Reset";

  let handleChange = (event: any) => {
    setEmailToReset(event.target.value);
  };

  const handleSubmit = (e: any) => {
    //Before sending the email, we need to get all corresponding user_ids
    try {
      fetch(`/api/users/gettingYourUser_Ids/${emailToReset}`)
        .then((res) => res.json())
        .then((result) => {
          console.log({ result });
          setArrayOfUsers(result);
        });
    } catch (error) {
      console.log("messing up in username retreaval");
      console.log(error);
    }

    //This is where we send the email
  };

  React.useEffect(() => {
    if (arrayOfUsers) {
      for (let x = 0; x < arrayOfUsers.length; x++) {
        console.log("attempting to send message");
        let userId = arrayOfUsers[x].id;

        var ciphertext1 = CryptoJS.AES.encrypt(
          userId.toString(),
          "123abc"
        ).toString();
        let encodedId = ciphertext1;

        try {
          fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: emailToReset,
              subject: subject1,
              html: `<h4>To reset the password for the username: <strong>${arrayOfUsers[x].email}</strong> <a href="https://dynamic-curriculum-on-heroku.herokuapp.com/PasswordResetLandingPage/${encodedId}">click here</a> or copy and paste the following web address into your browser: https://dynamic-curriculum-on-heroku.herokuapp.com/PasswordResetLandingPage/${encodedId}</h4>`,
              //The hardcoded url will cause issues between production and development. Don't forget!
            }),
          })
            .then((res) => res.json())
            .then((result) => console.log(result));
          alert(
            "Please check your email for a password reset link, it may be in your spam and may take a few minutes to reach your inbox. If you get this message multiple times, it's because you have multiple usernames associated with your email."
          );
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log("there was no array of users");
    }
  }, [arrayOfUsers]);

  return (
    <>
      <label>
        <strong>Email address: </strong>
      </label>
      <input
        className="m-2"
        type="text"
        onChange={handleChange}
        value={emailToReset}
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
