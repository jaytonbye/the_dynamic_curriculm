import React, { useState } from 'react'

interface Props {

}

interface IPersonalInfo {
    first_name: string;
    last_name: string;
}

const GradingDashboard2pointO: React.FC<Props> = () => {

    let UID = sessionStorage.getItem("UID");
    let token = sessionStorage.getItem("token");

    console.log(UID);

    const [personalInfo, setPersonalInfo] = React.useState<IPersonalInfo>({
        first_name: "wrestler's first name",
        last_name: "wrestler's last name",
    })

    const [totalPoints, setTotalPoints] = useState(0);
    const [totalPointsAvailable, setTotalPointsAvailable] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [itemsSortedByPercentOfTotalPoints, setItemsSortedByPercentOfTotalPoints] = useState([]);
    const [currentItem, setCurrentItem] = useState("Not Working");
    // const singlePerson = async (id: number) => {
    //     return Query("SELECT * FROM personal_Items WHERE user_id=?", [id]);
    //   };



    React.useEffect(() => {
        fetch(`/api/earnableItems/123`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((results: Array<Object> | any) => {
                setUserItems(results);
                (function () {
                    results.sort((a: any, b: any) => {
                        return a.percentage_of_total_points_needed - b.percentage_of_total_points_needed;
                    })

                    setItemsSortedByPercentOfTotalPoints(results);
                }());

            });
    }, []);

    React.useEffect(() => {
        fetch(`/api/personal_info/person/${UID}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((results) => {
                setPersonalInfo(results);
            });
    }, []);

    // These functions in combination with the SetStates get the potential and total 
    // grade of the wrestlers

    React.useEffect(() => {
        fetch(`/api/grades/allCurrentGradesForASingleWrestler/3`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((results) => {
                console.log(results);
                const totalPointsForSetter = results.reduce((total, currentValue) => {
                    total = total + currentValue.grade;
                    return total;
                }, 0)
                const totalPointsAvailableForSetter = results.reduce((total, currentValue) => {
                    total = total + currentValue.maximum_grade;
                    return total;
                }, 0)


                return {
                    totalPointsFrom: totalPointsForSetter,
                    totalPointsAvailableFrom: totalPointsAvailableForSetter,
                };
            }).then(async ({ totalPointsFrom, totalPointsAvailableFrom }) => {
                console.log({ totalPointsFrom });
                console.log({ totalPointsAvailableFrom });
                setTotalPoints(totalPointsFrom);
                setTotalPointsAvailable(totalPointsAvailableFrom);

            }
            )
    }, []);

    React.useEffect(() => {
        console.log('For Loop Is Here')
        console.log({ personalInfo });
        console.log({ totalPointsAvailable });
        console.log({ totalPoints });
        console.log({ userItems });
        console.log({ currentItem })
        console.log({ userItems });
        console.log({ itemsSortedByPercentOfTotalPoints });

        for (let theIndex = 0; theIndex < itemsSortedByPercentOfTotalPoints.length; theIndex++) {
            const element = itemsSortedByPercentOfTotalPoints[theIndex];
            if (element.percentage_of_total_points_needed >= totalPoints) {
                setCurrentItem(`${element.item_color} ${element.item_name}`)
                break;
            }
        }
    }, [totalPointsAvailable])


    return (
        <div>
            <h1 className="text-center">Hello</h1>
            <div className="card">
                <h5 className="card-header">
                    Wrestler Dashboard - NewerGuy B
                </h5>
                <div className="card-body">
                    <ul>
                        {
                            userItems.map((item) => {
                                return (<li key={item.id}>
                                    <h6 key={`${item.id}: PercentTotal: ${item.percentage_of_total_points_needed}`}>
                                        {item.item_color}  {item.item_name}
                                    </h6>
                                </li>)
                            }
                            )
                        }
                    </ul>
                    <p className="card-text">
                        Current Item: <strong>{currentItem}</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GradingDashboard2pointO;