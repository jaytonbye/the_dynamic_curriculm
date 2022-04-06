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

                })();
            });
    }, []);

    React.useEffect(() => {

        setItemsSortedByPercentOfTotalPoints(userItems.sort((a: any, b: any) => {
            return (
                a.percentage_of_total_points_needed -
                b.percentage_of_total_points_needed
            );
        }));
    }, [userItems]);


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
        fetch(`/ api / grades / allCurrentGradesForASingleWrestler / ${UID}`, {
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

    React.useEffect(() => {
        for (
            let theIndex = 0;
            theIndex < itemsSortedByPercentOfTotalPoints.length;
            theIndex++
        ) {
            const item = itemsSortedByPercentOfTotalPoints[theIndex]
            const lastItem = itemsSortedByPercentOfTotalPoints[itemsSortedByPercentOfTotalPoints.length - 1];


            if (1 === 1) {


                console.log({ itemsSortedByPercentOfTotalPoints })

                setCurrentItem(
                    !itemsSortedByPercentOfTotalPoints[theIndex - 1]
                        ? `${itemsSortedByPercentOfTotalPoints[0].item_color} ${itemsSortedByPercentOfTotalPoints[0].item_name}`
                        : `${itemsSortedByPercentOfTotalPoints[theIndex - 1].item_color} ${itemsSortedByPercentOfTotalPoints[theIndex - 1].item_name}`
                );

                setNextItem(
                    !itemsSortedByPercentOfTotalPoints[theIndex]
                        ? `${itemsSortedByPercentOfTotalPoints[1].item_color} ${itemsSortedByPercentOfTotalPoints[1].item_name}`
                        : `${itemsSortedByPercentOfTotalPoints[theIndex].item_color} ${itemsSortedByPercentOfTotalPoints[theIndex].item_name}`
                );


                let mathForNextItem =
                    ((!itemsSortedByPercentOfTotalPoints[theIndex + 1]
                        ? itemsSortedByPercentOfTotalPoints[theIndex]
                            .percentage_of_total_points_needed
                        : itemsSortedByPercentOfTotalPoints[theIndex + 1]
                            .percentage_of_total_points_needed) /
                        100) *
                    Number(totalPointsAvailable);



                let answer = Math.floor(mathForNextItem - totalPoints);
                console.log({ answer })
                setPointsTillNextItem(answer);

            } else if (item.percentage_of_total_points_needed === totalPoints) {


                if (!item) {
                    setCurrentItem("Place Holder Item");
                } else {
                    setCurrentItem(`${item.item_color} ${item.item_name} `);
                }

                break;
            } else {
                setCurrentItem(`${lastItem.item_color} ${lastItem.item_name} `);
                setNextItem("Until you master everything");
            }
        }
    }, [itemsSortedByPercentOfTotalPoints]);

    console.log({ itemsSortedByPercentOfTotalPoints })
    console.log({ nextItem })
    console.log({ pointsTillNextItem })

    return (
        <div>
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
                    <strong>{nextItem}: {pointsTillNextItem}</strong>
                </p>

                <p className="card-text"></p>
            </div>
        </div>
    );
};

export default WayneCarlsGradingDashboardForTwoWrestlers;


