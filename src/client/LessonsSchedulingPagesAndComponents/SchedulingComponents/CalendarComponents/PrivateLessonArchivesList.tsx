import * as React from "react";
import * as dateTimeHandlingFunctions from "../../ServicesForPrivateLessonScheduling/dateTimeHandlingFuncs";
import { useState, useEffect } from "react";
import { IFullPrivateLessonsSchedule } from "../../ServicesForPrivateLessonScheduling/interfaces";

// somtimes i get this in the browser console "Uncaught (in promise) TypeError: NetworkError when attempting to fetch resource."

const PrivateLessonArchivesList = (props: IProps) => {
  let [fullPrivateLessonsSchedule, setFullPrivateLessonsSchedule] =
    useState<IFullPrivateLessonsSchedule[]>();
  let [triggersReRender, setTriggersReRender] = useState<boolean>(true);

  useEffect(() => {
    fetch(
      `/api/schedulingLessons/getCoachesFullPrivateLessonsSchedule/${props.coachesId}`
    )
      .then((res) => res.json())
      .then((res) => setFullPrivateLessonsSchedule(res));
  }, [props.coachesId, props.propUsedOnlyForReRender, triggersReRender]);

  let handleCancelIndividualLesson = (e: any) => {
    e.preventDefault();
    let privateLessonId: string | number = e.target.value;
    let areYouSure = confirm(
      "Are you sure you want to delete this private lesson? This action cannot be undone."
    );
    if (areYouSure) {
      fetch(
        `/api/schedulingLessons/deleteIndividualPrivateLesson/${privateLessonId}`,
        {
          method: "DELETE",
        }
      ).then(() => {
        props.boolFuncForReRender();
        setTriggersReRender(!triggersReRender);
      });
    } else {
      return;
    }
  };

  let handleCancelSeries = (e: any) => {
    e.preventDefault();
    let seriesName = e.target.id;
    let privateLessonId = e.target.value;
    let areYouSure = confirm(
      "Are you sure you want to cancel this series? This will have no affect on any previous lessons within this series"
    );
    if (areYouSure) {
      fetch(
        `/api/schedulingLessons/deletePrivateLessonSeriesMovingForward/${seriesName}/${privateLessonId}`,
        {
          method: "DELETE",
        }
      ).then(() => {
        props.boolFuncForReRender();
        setTriggersReRender(!triggersReRender);
      });
    } else {
      return;
    }
  };

  if (!fullPrivateLessonsSchedule) {
    return (
      <div>
        <h5>No private lessons scheduled</h5>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center">
        <u>Private lesson archives</u>
      </h2>
      <div>
        {fullPrivateLessonsSchedule
          .slice(0)
          .reverse()
          .map((privateLesson) => {
            return (
              <div
                className="d-flex justify-content-center align-items-center border border-dark mt-3"
                key={privateLesson.private_lesson_id}
              >
                <div className="card-body col-5">
                  <h5 className="card-title">
                    <strong>Date: </strong>
                    {privateLesson.date_of_lesson.slice(0, 10)}
                  </h5>
                  <h6 className="card-text">
                    <strong>Time: </strong>
                    {dateTimeHandlingFunctions.timeMilitaryToAMPM(
                      privateLesson.start_time
                    )}
                  </h6>
                  <h6 className="card-text">
                    <strong>Duration: </strong> {privateLesson.duration} hrs/min
                  </h6>
                  <h6 className="card-text">
                    <strong>Wrestler: </strong>
                    {privateLesson.wrestler_first_name}{" "}
                    {privateLesson.wrestler_last_name}
                  </h6>
                  <p className="card-text">{privateLesson.notes}</p>
                </div>

                <div className="col-5">
                  <div className="m-2">
                    <button
                      onClick={handleCancelIndividualLesson}
                      value={privateLesson.private_lesson_id}
                      className="btn btn-danger"
                    >
                      Cancel lesson
                    </button>
                  </div>
                  {privateLesson.series_name ? (
                    <div className="m-2">
                      <button
                        onClick={handleCancelSeries}
                        id={privateLesson.series_name}
                        value={privateLesson.private_lesson_id}
                        className="btn btn-danger"
                      >
                        Cancel Series
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PrivateLessonArchivesList;

interface IProps {
  coachesId: number;
  propUsedOnlyForReRender?: boolean;
  boolFuncForReRender: Function;
}
