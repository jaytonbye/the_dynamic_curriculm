import * as React from "react";
import { useParams } from "react-router-dom";
import { IAllVideosInPlan } from "./EditLessonPlan";

const LessonPlanOverview = () => {
  let [videosInLessonPlan, setVideosInLessonPlan] = React.useState<
    Array<IAllVideosInPlan>
  >([]);
  let [nowPlayingURL, setNowPlayingURL] = React.useState();
  let { planId }: any = useParams();
  let token = localStorage.getItem("token");

  let getAllVideosInLessonPlanFunc = () => {
    fetch(`/api/lessonplans/getAllVideosInPlan/${planId}`)
      .then((res) => res.json())
      .then((res) => setVideosInLessonPlan(res));
  };

  let handleBringToTopButtonFunc = (e: any) => {
    setNowPlayingURL(e.target.value);
  };

  React.useEffect(() => {
    getAllVideosInLessonPlanFunc();
  }, []);

  return (
    <div>
      <div>
        <h1>Now Playing</h1>
        <div>
          <iframe
            width="95%"
            height="35%"
            src={`https://www.youtube.com/embed/${nowPlayingURL}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>

      <hr />

      <div className="sticky-top bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Move</th>
              <th>Video</th>
              <th>Duration</th>
              <th>Play</th>
            </tr>
          </thead>
          <tbody>
            {videosInLessonPlan.map((video) => {
              return (
                <tr>
                  <td>{video.orderNumber}</td>
                  <td>{video.videoName}</td>

                  <td>
                    <iframe
                      width="95%"
                      height="35%"
                      src={`https://www.youtube.com/embed/${video.videoURL}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </td>

                  <td>{video.lengthToDisplay}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={handleBringToTopButtonFunc}
                      value={video.videoURL}
                    >
                      Bring to top
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonPlanOverview;
