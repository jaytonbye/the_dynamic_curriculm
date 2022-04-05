import React, { useState } from "react";

interface Props {}

// This typing is wrong I did the correct type below as well as the default state to put in
//interface IPersonalInfo {
//     first_name: string;
//     last_name: string;
// }

interface IPersonalInfo {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  notes: string;
  user_id: number;
}

const defaultInfoState = {
  created_at: "a",
  first_name: "a",
  id: 0,
  last_name: "a",
  notes: "blah blah",
  user_id: 0,
}; //

const GradingDashboard2pointO: React.FC<Props> = () => {
  let UID = sessionStorage.getItem("UID");
  let token = sessionStorage.getItem("token");

  const [personalInfo, setPersonalInfo] = React.useState<IPersonalInfo>(
    defaultInfoState
  );

  const [totalPoints, setTotalPoints] = useState(0);
  const [totalPointsAvailable, setTotalPointsAvailable] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [
    itemsSortedByPercentOfTotalPoints,
    setItemsSortedByPercentOfTotalPoints,
  ] = useState([]);
  const [currentItem, setCurrentItem] = useState("Not Working");
  const [nextItem, setNextItem] = useState("Not Working");
  const [pointsTillNextItem, setPointsTillNextItem] = useState(0);

  console.log({ itemsSortedByPercentOfTotalPoints });

  React.useEffect(() => {
    fetch(`/api/earnableItems/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results: Array<Object> | any) => {
        setUserItems(results);
        (function () {
          results.sort((a: any, b: any) => {
            return (
              a.percentage_of_total_points_needed -
              b.percentage_of_total_points_needed
            );
          });
          setItemsSortedByPercentOfTotalPoints(results);
        })();
      });
  }, []);
  React.useEffect(() => {
    fetch(`/api/personal_info/person/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setPersonalInfo(results[0]);
      });
  }, []);

  // These functions in combination with the SetStates get the potential and total
  // grade of the wrestlers

  React.useEffect(() => {
    fetch(`/api/grades/allCurrentGradesForASingleWrestler/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        const totalPointsForSetter = results.reduce(
          (total: any, currentValue: any) => {
            total = total + currentValue.grade;
            return total;
          },
          0
        );
        const totalPointsAvailableForSetter = results.reduce(
          (total: any, currentValue: any) => {
            total = total + currentValue.maximum_grade;
            return total;
          },
          0
        );

        return {
          totalPointsFrom: totalPointsForSetter,
          totalPointsAvailableFrom: totalPointsAvailableForSetter,
        };
      })
      .then(async ({ totalPointsFrom, totalPointsAvailableFrom }) => {
        setTotalPoints(totalPointsFrom);
        setTotalPointsAvailable(totalPointsAvailableFrom);
      });
  }, []);

  React.useEffect(() => {
    console.log({ itemsSortedByPercentOfTotalPoints });
    for (
      let theIndex = 0;
      theIndex < itemsSortedByPercentOfTotalPoints.length;
      theIndex++
    ) {
      const element = itemsSortedByPercentOfTotalPoints[theIndex];
      if (element.percentage_of_total_points_needed > totalPoints) {
        setCurrentItem(
          `${
            itemsSortedByPercentOfTotalPoints[theIndex - 1].item_color
              ? itemsSortedByPercentOfTotalPoints[theIndex - 1].item_color
              : itemsSortedByPercentOfTotalPoints[0].item_color
          } ${itemsSortedByPercentOfTotalPoints[theIndex - 1].item_name} `
        );

        setNextItem(
          `${
            itemsSortedByPercentOfTotalPoints[theIndex].item_color
              ? itemsSortedByPercentOfTotalPoints[theIndex].item_color
              : itemsSortedByPercentOfTotalPoints[0].item_color
          } ${itemsSortedByPercentOfTotalPoints[theIndex].item_name} `
        );

        let mathForNextItem =
          ((itemsSortedByPercentOfTotalPoints[theIndex + 1]
            .percentage_of_total_points_needed
            ? itemsSortedByPercentOfTotalPoints[theIndex + 1]
                .percentage_of_total_points_needed
            : 0) /
            100) *
          Number(totalPointsAvailable);

        let answer = Math.floor(mathForNextItem - totalPoints);
        setPointsTillNextItem(answer);

        break;
      } else if (element.percentage_of_total_points_needed === totalPoints) {
        setCurrentItem(`${element}.item_color} ${element}.item_name} `);
        break;
      }
    }
  }, [totalPointsAvailable]);

  return (
    <div>
      <div className="card">
        <h5 className="card-header">
          Wrestler Dashboard - {personalInfo.first_name}{" "}
          {personalInfo.last_name}
        </h5>
        <div className="card-body">
          <h5>Earnable Items:</h5>
          <ul>
            {userItems.map((item) => {
              return (
                <li key={item.id}>
                  <h6
                    key={`${item.id}: PercentTotal: ${item.percentage_of_total_points_needed} `}
                  >
                    {item.item_color} {item.item_name} (
                    {Math.round(
                      Number(totalPointsAvailable) *
                        (item.percentage_of_total_points_needed / 100)
                    )}{" "}
                    points)
                  </h6>
                </li>
              );
            })}
          </ul>
          <p className="card-text">
            Current Item Earned: <strong>{currentItem}</strong>
            <br />
            You have earned <strong>{totalPoints}</strong> of{" "}
            <strong>{totalPointsAvailable}</strong> total points available.
          </p>

          <p>
            Number of points until <strong>{nextItem}</strong>:{" "}
            <strong>{pointsTillNextItem}</strong>
          </p>
          <p className="card-text"></p>
        </div>
      </div>
    </div>
  );
};

export default GradingDashboard2pointO;
