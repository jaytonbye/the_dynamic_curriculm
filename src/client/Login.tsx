import React from "react";
import { Link, useHistory } from "react-router-dom";
import { apiService } from "./services/api-services";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleLogin = (e: any) => {
    e.preventDefault();
    apiService("/auth/login", "POST", {
      email,
      password,
    })
      .then((data) => {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("UID", data.UID);

        // This is a bit hackish, as i'm letting them move forward if they have a token (not if the token is valid).
        let token = sessionStorage.getItem("token");
        if (token) {
          console.log("token exists, going to wrestler's view page");
          history.push("/wrestlersview");
        }
      })
      .catch(() => {
        alert("wrong username/password (or something else went wrong...)");
        // error is already logged from apiService
        // so possibly use history object to navigate to error page??
      });
  };
  return (
    <>
      <main className="container">
        <section className="mt-4 row justify-content-center">
          <form className="p-4 border rounded shadown form-group">
            <label>
              Username (If you followed the instructions, it should be your full
              name in all lowercase letters with no spaces. Example: johndoe):{" "}
            </label>
            <input
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
            <Link to={`/createAccount`}>
              Or click here to create an account
            </Link>
          </form>
        </section>
      </main>
      <h3 className="text text-center">
        If nothing is happening when you click the button, it's because your
        username/password is wrong. If you can't remember your
        username/password, message coach Jason and he will help you.
      </h3>
    </>
  );
}

export default Login;
