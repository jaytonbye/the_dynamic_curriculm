import React from "react";
import { Link, useHistory } from "react-router-dom";
import { apiService } from "./services/api-services";

function CreateAccount() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let history = useHistory();

  const handleCreateAccount = (e) => {
    try {
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      fetch("/api/users", requestOptions).then((data) => {
        alert(
          "Your account was created, you can now create your wrestler profile"
        );
        apiService("/auth/login", "POST", {
          email,
          password,
        }).then((data) => {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("UID", data.UID);
        });
        history.push("/profilepage");
      });
    } catch (error) {
      // error is already logged from apiService
      // so possibly use history object to navigate to error page?
    }
  };

  return (
    <>
      <main className="container">
        <section className="mt-4 row justify-content-center">
          <form className="p-4 border rounded shadown form-group">
            <label>Email: </label>
            <input
              type="email"
              autoComplete="email"
              className="mb-2 form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password: </label>
            <input
              type="password"
              autoComplete="password"
              className="mb-2 form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleCreateAccount} className="btn btn-primary">
              Create Account
            </button>
            <br />
            <Link to={`/login`}>Or click here to login</Link>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateAccount;
