import * as React from "react";
import { Link } from "react-router-dom";

const Home = (props: HomeProps) => {
  return (
    <>
      <h1>Welcome to the Dynamic Wrestling Curriculum</h1>
      <main className="container">
        <section className="mt-4 row justify-content-center">
          <div>
            <Link to={`/login`} className="mb-2">
              Login
            </Link>
          </div>
          <br />
          {/*why can't i get them on different lines? */}
          <div>
            <Link to={`/createAccount`} className="mb-2">
              Create An Account
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

interface HomeProps {}

export default Home;
