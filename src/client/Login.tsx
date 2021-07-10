import React from "react";
import { Link } from "react-router-dom";
import { apiService } from "./services/api-services";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    try {
      const token = apiService("/auth/login", "POST", {
        email,
        password,
      }).then((data) => {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("UID", data.UID);
      });
      console.log(token);
      //after it gives the token, I want it to navigate to the wrestler's page
      history.push("/wrestlersview");
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
