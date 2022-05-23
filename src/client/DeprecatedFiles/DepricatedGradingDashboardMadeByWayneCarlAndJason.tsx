import React, { useState } from "react";
import { Card } from "react-bootstrap";

export default function GradingDashboardMadeByWayneCarlAndJason(props: any) {
  const [personalInfo, setPersonalInfo] = useState({
    first_name: "not yet loaded",
    last_name: "not yet loaded",
  });
  const [earnableItems, setEarnableItems] = useState([]);
  const [
    totalPointsEarnedByWrestler,
    setTotalPointsEarnedByWrestler,
  ] = useState(0);
  const [totalPointsAvailable, setTotalPointsAvailable] = useState(1);
  const [currentItemEarned, setCurrentItemEarned] = useState("default item");
  const [nextItemToBeEarned, setNextItemToBeEarned] = useState("You did it!");

  let UID = props.UID;
  let token = localStorage.getItem("token");

  React.useEffect(() => {
    fetch(`/api/personal_info/person/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        if (results[0]) {
          setPersonalInfo(results[0]);
        }
      });
  }, []);

  React.useEffect(() => {
    fetch(`/api/earnableItems/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results: Array<Object> | any) => {
        setEarnableItems(results);
      });
  }, []);

  React.useEffect(() => {
    fetch(`/api/grades/allCurrentGradesForASingleWrestler/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        //calculates total grades

        let totalPoints = 0;
        for (let x = 0; x < results.length; x++) {
          totalPoints = totalPoints + results[x].grade;
        }

        setTotalPointsEarnedByWrestler(totalPoints);
      });
  }, []);

  React.useEffect(() => {
    fetch(`/api/videos/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results: Array<Object> | any) => {
        let totalPointsAv = 0;

        for (let x = 0; x < results.length; x++) {
          totalPointsAv = totalPointsAv + results[x].maximum_grade;
        }

        setTotalPointsAvailable(totalPointsAv);
      });
  }, []);

  React.useEffect(() => {
    if (!earnableItems.length || !totalPointsEarnedByWrestler) {
      return;
    }
    let pointsRequiredToEarnThisItem = 0;
    for (let x = 0; x < earnableItems.length; x++) {
      pointsRequiredToEarnThisItem =
        (earnableItems[x].percentage_of_total_points_needed *
          totalPointsAvailable) /
        100;
      console.log({
        totalPointsEarnedByWrestler,
        pointsRequiredToEarnThisItem,
      });
      if (totalPointsEarnedByWrestler < pointsRequiredToEarnThisItem) {
        setNextItemToBeEarned(
          `${earnableItems[x].item_color} ${earnableItems[x].item_name}`
        );
        break;
      }
    }
  }, [totalPointsEarnedByWrestler, earnableItems]);

  React.useEffect(() => {
    //the ole "if it ain't ready, return trick"
    if (!earnableItems.length || !totalPointsEarnedByWrestler) {
      return;
    }
    let pointsRequiredToEarnThisItem;
    for (let x = 0; x < earnableItems.length; x++) {
      pointsRequiredToEarnThisItem =
        (earnableItems[x].percentage_of_total_points_needed *
          totalPointsAvailable) /
        100;
      console.log({ pointsRequiredToEarnThisItem });
      if (totalPointsEarnedByWrestler >= pointsRequiredToEarnThisItem) {
        setCurrentItemEarned(
          `${earnableItems[x].item_color} ${earnableItems[x].item_name}`
        );
      }
    }
  }, [totalPointsEarnedByWrestler, earnableItems]);

  return (
    <>
      <Card className="w-75 my-2 mx-3 mx-auto">
        <div className="d-flex flex-wrap justify-content-center m-1">
          <div className="card mt-1">
            <h5 className="card-header ">
              {personalInfo.first_name} {personalInfo.last_name}'s Wrestler
              Dashboard
            </h5>
          </div>
        </div>
        <Card.Body>
          <Card.Title>
            <h5>Earnable Items:</h5>
          </Card.Title>
          <Card.Text>
            <ul>
              {earnableItems.map((item) => {
                return (
                  <li key={`test-${item.id}-${props.UID}`}>
                    <h6>
                      {item.item_color} {item.item_name} -{" "}
                      {Math.ceil(
                        (item.percentage_of_total_points_needed *
                          totalPointsAvailable) /
                        100
                      )}{" "}
                      stars required
                    </h6>
                  </li>
                );
              })}
            </ul>
            <p className="card-text">
              Current Item Earned: <strong>{currentItemEarned}</strong>
              <br />
              You have earned <strong>
                {totalPointsEarnedByWrestler}
              </strong> of <strong>{totalPointsAvailable}</strong> total
              available stars.
            </p>
          </Card.Text>

          <Card.Footer>
            <p>
              Next item: <strong>{nextItemToBeEarned} </strong>
            </p>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}
