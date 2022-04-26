import Moment from "react-moment";
import * as React from "react";
import { IAllPlans } from "./types";
import { Link } from "react-router-dom";

const ViewPlans = () => {
  let token = localStorage.getItem("token");
  let [allPlansArray, setAllPlansArray] = React.useState<Array<IAllPlans>>([]);
  let [coachesName, setCoachesName] = React.useState<
    Array<{ firstName: string; lastName: string }>
  >([]);

  React.useEffect(() => {
    getAllPlansFunc();
  }, []);

  let getAllPlansFunc = () => {
    fetch(`/api/lessonplans/validateToketLessonPlanCreate`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        fetch(`/api/lessonplans/getCoachName/${res.userId}`) // can make a query to get lessonplaans coaches name
          .then((res) => res.json())
          .then((res) => setCoachesName(res));
        fetch(`/api/lessonplans/getAllLessonPlansForUser/${res.userId}`) // 
          .then((res) => res.json())
          .then((res) => setAllPlansArray(res));
      });
  };

  let handleDeleteButtonClick = (e: any) => {
    let confirmDelete = confirm("Are you sure you want to delete plan?");
    if (confirmDelete) {
      let lessonPlanId = e.target.value;
      fetch(`/api/lessonplans/deleteLessonPlan/${lessonPlanId}`, {
        method: "DELETE",
      }).then(() => getAllPlansFunc());
    } else {
      return;
    }
  };

  if (!coachesName[0] || !allPlansArray[0]) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }

  return (
    <div>
      <>
        <h2>Your plans</h2>
        <div className="sticky-top bg-white"></div>
        <table className="table">
          <thead>
            <tr>
              <th>Lesson Plan</th>
              <th>Coach</th>
              <th>date Created</th>
            </tr>
          </thead>
          <tbody>
            {allPlansArray.map((plan) => {
              return (
                <tr key={plan.id}>
                  <td>
                    <Link
                      to={`/PlayLessonPlan/${plan.id}`}
                      className="btn-link"
                    >
                      {plan.name_of_lesson_plan}
                    </Link>
                  </td>
                  <td>
                    {coachesName[0].firstName} {coachesName[0].lastName}
                  </td>
                  <td>
                    <Moment fromNow>{plan.date_created}</Moment>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      value={plan.id}
                      onClick={handleDeleteButtonClick}
                    >
                      Delete Plan
                    </button>
                    <Link
                      className="btn btn-success"
                      to={`/EditALessonPlan/${plan.id}`}
                      //   value={plan.id}
                      //   onClick={handleDeleteButtonClick}
                    >
                      Edit Plan
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default ViewPlans;
