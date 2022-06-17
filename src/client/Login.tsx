import React from "react";
import { Link, useHistory } from "react-router-dom";
import { apiService } from "./services/api-services";
import PasswordReset from "./PasswordReset";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const [showPasswordReset, setShowPasswordReset] = React.useState(false);

  const forgotPassword = () => {
    setShowPasswordReset(!showPasswordReset);
  };
  const handleLogin = (e: any) => {
    e.preventDefault();
    apiService("/auth/login", "POST", {
      email,
      password,
    })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("UID", data.UID);

        // This is a bit hackish, as i'm letting them move forward if they have a token (not if the token is valid).
        let token = localStorage.getItem("token");
        let userID = data.UID;

        successfulLogin(userID);
        if (token) {
          history.push("/wrestlersview");
        }
      })
      .catch(() => {
        alert("wrong username/password (or something else went wrong...)");
        // error is already logged from apiService
        // so possibly use history object to navigate to error page??
      });
  };

  let successfulLogin = (UserID: number) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: UserID,
        }),
      };
      fetch(`/api/successfulLogins/`, requestOptions).then((res) => {
        if (res.ok) {
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="container">
        <section className="mt-4 row justify-content-center">
          <form className="p-4 border rounded shadown form-group">
            <label>
              Username (If you followed the instructions, your username will be
              your full name in all lowercase letters with no spaces. Example:
              johndoe):{" "}
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
            <div className="d-flex justify-content-start flex-wrap align-items-center">
              <button
                onClick={handleLogin}
                className="btn btn-primary ml-2 mt-2"
              >
                Login
              </button>
              <Link
                className="btn btn-secondary ml-2 mt-2"
                to={`/createAccount`}
              >
                Or click here to create an account
              </Link>
            </div>
          </form>
          <button className="buttonThatLooksLikeALink" onClick={forgotPassword}>
            Forgot your username or password?
          </button>
        </section>
      </main>

      {showPasswordReset && <PasswordReset />}
    </>
  );
}

export default Login;
