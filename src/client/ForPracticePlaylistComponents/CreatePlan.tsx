import * as React from "react";

const CreatPlan = () => {
  let token = localStorage.getItem("token");
  let [planName, setPlanName] = React.useState("");
  let [userId, setUserId] = React.useState("");
  let [tenant, setTenant] = React.useState("");

  let submitNewPlan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!planName.trim()) return alert("Enter a plan name")
    fetch(`/api/lessonplans/addNewLessonPlan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planName,
        userId,
        tenant,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert(res.message)); //.then(res => alert("Your plan has been added!"))
  };

  React.useEffect(() => {
    fetch(`/api/lessonplans/validateToketLessonPlanCreate`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserId(res.userId);
        setTenant(res.tenant);
      });
  }, []);

  return (
    <div>
      <main className="container">
        <section className="mt-4 row justify-content-center">
          <form action="" className="p-4 border rounded shadown form-group">
            <label>Lesson plan name: </label>
            <input
              className="mb-2 form-control"
              onChange={(e) => setPlanName(e.target.value)}
            />
            <div className="d-flex justify-content-start flex-wrap align-items-center">
              <button
                className="btn btn-primary ml-2 mt-2"
                onClick={submitNewPlan}
              >
                submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreatPlan;
