import Moment from "react-moment";
import * as React from "react";
import { Link } from "react-router-dom";

let ViewPlans = () => {
  let token = localStorage.getItem("token");
  let [allPlansArray, setAllPlansArray] = React.useState<Array<IAllPlans>>([]);
  let [role, setRole] = React.useState<string>("");
  let [tenant, setTenant] = React.useState<string>("");
  let [userId, setUserId] = React.useState<number>();

  let getAllPlansFunc = () => {
    fetch(`/api/lessonplans/validateToketLessonPlanCreate`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setRole(res.role);
        setTenant(res.tenant);
        setUserId(res.userId);
        fetch(`/api/lessonplans/getAllLessonPlansForUser/${res.tenant}`) //
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

  let htmlBasedOnRole = (planID: number, userID: number) => {
    if (
      (role === "admin" && userID === userId) ||
      (role === "coach" && userID === userId)
    ) {
      return (
        <td>
          <button
            className="btn btn-danger"
            value={planID}
            onClick={handleDeleteButtonClick}
          >
            Delete Plan
          </button>
          <Link className="btn btn-success" to={`/EditALessonPlan/${planID}`}>
            Edit Plan
          </Link>
        </td>
      );
    }
  };

  React.useEffect(() => {
    getAllPlansFunc();
  }, []);

  if (!allPlansArray[0]) {
    return (
      <div>
        <h1>No plans for {tenant} ...</h1>
      </div>
    );
  }

  return (
    <div className="ml-3">
      <>
        <h1 className="mt-3">Lesson Plans for {tenant}</h1>
        <div className="sticky-top bg-white"></div>
        <table className="table">
          <thead>
            <tr>
              <th>Lesson Plan</th>
              <th>Coach</th>
              <th>Created</th>
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
                    {plan.coaches_FN} {plan.coaches_LN}
                  </td>
                  <td>
                    <Moment fromNow>{plan.date_created}</Moment>
                  </td>
                  {htmlBasedOnRole(plan.id, plan.created_by)}
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

export interface IAllPlans {
  id: number;
  name_of_lesson_plan: string;
  created_by: number;
  tenant: string;
  date_created: Date;
  coaches_FN: string;
  coaches_LN: string;
}
