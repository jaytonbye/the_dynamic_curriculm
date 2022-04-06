import React, { useState } from "react";

interface Props {
    wrestlerIdFromGradingDashBoardForTwoWrestlersTwoPointO: number
}

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
    id: 21,
    last_name: "a",
    notes: "blah blah",
    user_id: 21,
}; //

const WayneCarlsGradingDashboardForTwoWrestlers: React.FC<Props> = ({ wrestlerIdFromGradingDashBoardForTwoWrestlersTwoPointO }) => {
    let UID = wrestlerIdFromGradingDashBoardForTwoWrestlersTwoPointO ? wrestlerIdFromGradingDashBoardForTwoWrestlersTwoPointO : console.log("UID wasn't passed correctly");
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
                        return (
                            a.percentage_of_total_points_needed -
                            b.percentage_of_total_points_needed
                        );
                    });
                    setItemsSortedByPercentOfTotalPoints(results);
                })();
            });
    }, []);
    // console.log({ itemsSortedByPercentOfTotalPoints });
    React.useEffect(() => {
        fetch(`/api/personal_info/person/${UID}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((results) => {
                console.log(results[0]);
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
        // console.log('For Loop Is Here')
        // console.log({ personalInfo });
        // console.log({ totalPointsAvailable });
        console.log({ totalPoints });
        // console.log({ userItems });
        // console.log({ currentItem })
        // console.log({ userItems });
        // console.log({ itemsSortedByPercentOfTotalPoints });

        for (
            let theIndex = 0;
            theIndex < itemsSortedByPercentOfTotalPoints.length;
            theIndex++
        ) {
            const element = itemsSortedByPercentOfTotalPoints[theIndex];
            const lastElement = itemsSortedByPercentOfTotalPoints[itemsSortedByPercentOfTotalPoints.length - 1];

            if (totalPoints >= Number(totalPointsAvailable) * lastElement.percentage_of_total_points_needed) {
                setCurrentItem(`${itemsSortedByPercentOfTotalPoints[itemsSortedByPercentOfTotalPoints.length - 1].item_color} 
                ${itemsSortedByPercentOfTotalPoints[itemsSortedByPercentOfTotalPoints.length - 1].item_name} `);
                break;
            }
            else if (totalPoints === 0) {
                setCurrentItem(`${itemsSortedByPercentOfTotalPoints[0].item_color} 
                ${itemsSortedByPercentOfTotalPoints[0].item_name} `);
            }
            else if (element.percentage_of_total_points_needed > totalPoints) {
                setCurrentItem(
                    `${itemsSortedByPercentOfTotalPoints[theIndex - 1].item_color} ${itemsSortedByPercentOfTotalPoints[theIndex - 1].item_name
                    } `
                );
            }

        }
    }, [totalPointsAvailable, totalPoints, userItems, itemsSortedByPercentOfTotalPoints, personalInfo]);


    console.log({ itemsSortedByPercentOfTotalPoints });

    return (
        <>
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
                Current Item Earned: <strong>{currentItem === "Not Working" ? `Theres been an error you have this many points ${totalPoints}` : currentItem}</strong>
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
        </>
    );
};

export default WayneCarlsGradingDashboardForTwoWrestlers;


