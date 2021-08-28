import * as React from "react";
import { Link } from "react-router-dom";

const Home = (props: HomeProps) => {
  return (
    <>
      <h1 className="text text-center">
        Welcome to the Dynamic Wrestling Curriculum
      </h1>
      <main>
        <section className="d-flex mt-4 justify-content-center">
          <div className="d-flex">
            <Link to={`/login`} className="mb-2">
              Login
            </Link>
          </div>
          <br />
          <div className="d-flex">
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
