import React from "react";
import { Link } from "react-router-dom";
import { apiService } from "./services/api-services";

function CreateAccount() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();
    try {
      //do I need const token here? It seems like I can just call apiService...
      const token = apiService("/api/users", "POST", {
        email: email,
        password: password,
      }).then((data) => {
        console.log(data);
        sessionStorage.setItem("token", data.token);
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
