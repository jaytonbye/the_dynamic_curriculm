import React from "react";

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
          console.log(result);
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
        let encodedId = arrayOfUsers[x].id;

        try {
          fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "test@test.com",
              subject: subject1,
              html: `<h4>To reset the password for the username: <strong>${arrayOfUsers[x].email}</strong> <a href="http://localhost:3000/PasswordResetLandingPage/${encodedId}">click here</a></h4>`,
              //The use of localhost (above) will cause a problem in production. Don't forget!
            }),
          })
            .then((res) => res.json())
            .then((result) => console.log(result));
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
