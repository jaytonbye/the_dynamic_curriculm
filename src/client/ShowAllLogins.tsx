import React from "react";
import Moment from "react-moment";

export default function ShowAllLogins() {
  const [allUserLogins, setAllUserLogins] = React.useState([]);

  React.useEffect(() => {
    fetch(`/api/successfulLogins`)
      .then((res) => res.json())
      .then((results) => {
        setAllUserLogins(results);
      });
  }, []);
  return (
    <>
      <h1>
        This page will show all of the wrestlers and coaches who have logged in
      </h1>

      <table className="table ">
        <thead className="sticky-top">
          <tr className="bg-light">
            <th>User Id</th>
            <th>Wrestler's Name</th>
            <th>Time Since Login</th>
          </tr>
        </thead>
        <tbody>
          {allUserLogins.map((login) => {
            return (
              <tr key={`${login.id}`}>
                <td>{login.user_id}</td>
                <td>
                  {login.first_name} {login.last_name}
                </td>
                <td>
                  <Moment fromNow>{login.login_was_created_at}</Moment>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
