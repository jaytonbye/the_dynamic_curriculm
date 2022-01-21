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

    const [totalPoints, setTotalPoints] = useState(null);
    const [totalPointsAvailable, setTotalPointsAvailable] = useState(null);

    // const singlePerson = async (id: number) => {
    //     return Query("SELECT * FROM personal_info WHERE user_id=?", [id]);
    //   };

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
                    totalPoints: totalPointsForSetter,
                    totalPointsAvailable: totalPointsAvailableForSetter,
                };
            }).then(({ totalPoints, totalPointsAvailable }) => {
                setTotalPoints(totalPoints);
                setTotalPointsAvailable(totalPointsAvailable);
            }
            );
    }, []);

    console.log(totalPoints);
    console.log(totalPointsAvailable);

    return (
        <div>
            <h1 className="text-center">Hello</h1>
            <div className="card">
                <h5 className="card-header">
                    Wrestler Dashboard - NewerGuy B
                </h5>
                <div className="card-body">
                    <h5 className="card-title">
                        <strong>
                            {/*{personalInfo.first_name} {personalInfo.last_name}*/}
                        </strong>
                    </h5>
                    <p className="card-text">
                        Current Shirt Color: <strong>{ }</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GradingDashboard2pointO;