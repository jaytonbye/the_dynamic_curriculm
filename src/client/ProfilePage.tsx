import React from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const history = useHistory();
  let UID = sessionStorage.getItem("UID");
  let token = sessionStorage.getItem("token");

  const handleCreateProfile = (e) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          user_id: UID,
        }),
      };
      fetch("http://localhost:3000/api/personal_info", requestOptions).then(
        (data) => {
          alert("profile created");
          history.push("/wrestlersview");
        }
      );
    } catch (error) {
      console.log("something is going wrong in your profile page code");
    }
  };

  return (
    <>
      <main className="container">
        <section className="mt-4 row justify-content-center">
          <form className="p-4 border rounded shadown form-group">
            <label>Wrestler's first name: </label>
            <input
              type="text"
              className="mb-2 form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Wrestler's last name: </label>
            <input
              type="text"
              className="mb-2 form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <button onClick={handleCreateProfile} className="btn btn-primary">
              Create/Update Profile
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;
