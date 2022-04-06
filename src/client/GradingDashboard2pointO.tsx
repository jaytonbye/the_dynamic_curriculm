import React, { useState } from "react";

interface Props { }

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
  const [currentItem, setCurrentItem] = useState("Place Holder Item");
  const [nextItem, setNextItem] = useState("Place Holder Item");
  const [pointsTillNextItem, setPointsTillNextItem] = useState(0);


  React.useEffect(() => {
    fetch(`/api/earnableItems/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results: Array<Object> | any) => {
        setUserItems(results);
        (function () {
          results.sort((a: any, b: any) => {
            if (!a.percent_of_total_points || !b.percent_of_total_points) {
              console.log("Problem in grading dashboard for two point o")
              console.log(a, b)
            } else {
              return (
                (Number(a.percentage_of_total_points_needed) -
                  Number(b.percentage_of_total_points_needed))
              );
            }
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
    console.log({ itemsSortedByPercentOfTotalPoints });
    for (
      let theIndex = 0;
      theIndex < itemsSortedByPercentOfTotalPoints.length;
      theIndex++
    ) {
      const item = itemsSortedByPercentOfTotalPoints[theIndex]


      if ((item.percentage_of_total_points_needed / 100) * Number(totalPointsAvailable) > totalPoints) {
        console.log(itemsSortedByPercentOfTotalPoints[theIndex - 1])

        console.log(item);
        setCurrentItem(
          `${itemsSortedByPercentOfTotalPoints[theIndex - 1].item_color
            ? itemsSortedByPercentOfTotalPoints[theIndex - 1].item_color
            : itemsSortedByPercentOfTotalPoints[0].item_color
          } ${itemsSortedByPercentOfTotalPoints[theIndex - 1].item_name} `
        );

        setNextItem(
          itemsSortedByPercentOfTotalPoints[theIndex].item_color
            ? `${itemsSortedByPercentOfTotalPoints[theIndex].item_color} ${itemsSortedByPercentOfTotalPoints[theIndex].item_name}`
            : `${itemsSortedByPercentOfTotalPoints[1].item_color} ${itemsSortedByPercentOfTotalPoints[1].item_name}`
        );

        console.log({ itemAboveerror: itemsSortedByPercentOfTotalPoints[theIndex], theIndex });

        let mathForNextItem =
          ((!itemsSortedByPercentOfTotalPoints[theIndex + 1]
            ? itemsSortedByPercentOfTotalPoints[theIndex]
              .percentage_of_total_points_needed
            : itemsSortedByPercentOfTotalPoints[theIndex + 1]
              .percentage_of_total_points_needed) /
            100) *
          Number(totalPointsAvailable);

        console.log({ mathForNextItem })

        let answer = Math.floor(mathForNextItem - totalPoints);
        setPointsTillNextItem(answer);

        break;
      } else if (item.percentage_of_total_points_needed === totalPoints) {


        if (!item) {
          console.log({ item })
          setCurrentItem("Place Holder Item");
        } else {
          console.log({ item })
          setCurrentItem(`${item.item_color} ${item.item_name} `);
        }

        break;
      }
    }
  }, [totalPointsAvailable, itemsSortedByPercentOfTotalPoints]);

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
        await setTotalPoints(totalPointsFrom);
        await setTotalPointsAvailable(totalPointsAvailableFrom);
      });
  }, []);



  console.log({ totalPoints })

  console.log({ totalPointsAvailable })

  console.log({ currentItem });

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
            Number of points until <strong>{nextItem === "Place Holder Item" ?
              `${!itemsSortedByPercentOfTotalPoints[1] ? "A different Color Place Holder" : itemsSortedByPercentOfTotalPoints[1]} 
                    ${!itemsSortedByPercentOfTotalPoints[1] ? "A different Name Place Holder" : itemsSortedByPercentOfTotalPoints[1]}` :
              nextItem}</strong>:{" "}            <strong>{pointsTillNextItem}</strong>
          </p>
          <p className="card-text"></p>
        </div>
      </div>
    </div>
  );
};

export default GradingDashboard2pointO;
