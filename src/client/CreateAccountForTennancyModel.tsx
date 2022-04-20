import React, { EventHandler } from "react";
import { Link, useHistory } from "react-router-dom";
import { apiService } from "./services/api-services";

function CreateAccount() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [realEmail, setRealEmail] = React.useState("");
  const [userTenant, setUserTenant] = React.useState("");
  const [createdAccountsRoll, setCreatedAccountsRoll] = React.useState(
    "wrestler"
  );
  const [wrestlersFirstName, setWrestlersFirstName] = React.useState("");
  const [wrestlersLastName, setWrestlersLastName] = React.useState("");

  let UID = Number(localStorage.getItem("UID"));

  //gets the user's tenant so that the wrestlers created are linked to the proper tenant
  React.useEffect(() => {
    fetch(`/api/users/${UID}`)
      .then((res) => res.json())
      .then((results) => {
        setUserTenant(results[0].tenant);
      });
  });

  let history = useHistory();

  const handleCreateAccount = (e: any) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    try {
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: createdAccountsRoll,
          real_email: realEmail,
          tenant: userTenant,
          first_name: wrestlersFirstName,
          last_name: wrestlersLastName,
        }),
      };

      fetch("/api/users/forAdminCreatedAccounts", requestOptions).then(
        (data) => {
          apiService("/auth/login", "POST", {
            email,
            password,
          });
          alert("The account was created!");
          history.go(0);
        }
      );
    } catch (error) {
      alert("it didn't work");
      // error is already logged from apiService
      // so possibly use history object to navigate to error page?
    }
  };

  return (
    <>
      <main className="container">
        <section className="mt-4 row justify-content-center">
          <form className="p-4 border rounded shadown form-group">
            <h2>Add wrestlers and coaches to your team's curriculum:</h2>
            <label>Wrestler's first name:</label>
            <input
              className="mb-2 form-control"
              value={wrestlersFirstName}
              onChange={(e) => setWrestlersFirstName(e.target.value)}
            />
            <label>Wrestler's last name:</label>
            <input
              className="mb-2 form-control"
              value={wrestlersLastName}
              onChange={(e) => setWrestlersLastName(e.target.value)}
            />
            <label>
              Username (please format it as the wrestler's full name with all
              lowercase letters and no spaces. Example: johndoe):{" "}
            </label>
            <input
              className="mb-2 form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email: </label>
            <input
              className="mb-2 form-control"
              value={realEmail}
              onChange={(e) => setRealEmail(e.target.value)}
            />
            <label>Password: </label>
            <input
              type="password"
              autoComplete="password"
              className="mb-2 form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Role: </label>
            <select
              name="role"
              id="role"
              className="mb-2 form-control"
              onChange={(e) => setCreatedAccountsRoll(e.target.value)}
            >
              <option value="wrestler">Wrestler</option>
              <option value="coach">
                Coach (can submit and edit grades of wrestlers)
              </option>
              <option value="admin">
                Admin (can add/delete videos, can register new accounts)
              </option>
            </select>
            <button onClick={handleCreateAccount} className="btn btn-primary">
              Create Account
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateAccount;
