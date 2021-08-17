import React from "react";
import { Link, useHistory } from "react-router-dom";
import { apiService } from "./services/api-services";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    try {
      e.preventDefault();
      apiService("/auth/login", "POST", {
        email,
        password,
      }).then((data) => {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("UID", data.UID);

        // This is a bit hackish, as i'm letting them move forward if they have a token (not if the token is valid).
        let token = sessionStorage.getItem("token");
        if (token) {
          console.log("token exists, going to wrestler's view page");
          history.push("/wrestlersview");
        } else {
          alert("wrong username/password (or something else went wrong...)");
          history.push("/login");
        }
      });
    } catch (error) {
      alert("you somehow reached the catch in login.tsx");
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
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
            <br />
            <Link to={`/createAccount`}>
              Or click here to create an account
            </Link>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;
