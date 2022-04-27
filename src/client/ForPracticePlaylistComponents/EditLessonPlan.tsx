import * as React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { IAllVideosByTenant } from "./types";

// lesson_plan_id int not null,
// video_id int not null,
// duration_to_display_video_in_seconds int not null,
// number_for_ordering float not null,

const EditLessonPlan = () => {
  let [videosByTenant, setVideosByTenant] = React.useState([]);
  let [videosInLessonPlan, setVideosInLessonPlan] = React.useState<
    Array<IAllVideosInPlan>
  >([]);
  let [searchedMoveId, setSearchedMoveId] = React.useState();
  let [searchedMoveObject, setSearchedMoveObject] = React.useState<any>({});
  let [durationToPlayVideo, setDurationToPlayVideo] = React.useState("");
  let [orderOfVideo, setOrderOfVideo] = React.useState("");
  let { planId }: any = useParams();

  let UID = localStorage.getItem("UID");
  let token = localStorage.getItem("token");


  let getAllVideosInLessonPlanFunc = () => {
    fetch(`/api/lessonplans/getAllVideosInPlan/${planId}`)
      .then((res) => res.json())
      .then((res) => setVideosInLessonPlan(res));
  };
  
  let addToLessonFunc = () => {
    fetch(`/api/lessonplans/addNewVideoToLessonPlan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: planId,
        videoId: searchedMoveId,
        durationOfVideo: durationToPlayVideo,
        orderVideo: orderOfVideo,
      }),
    })
      .then(() => alert("Video has been added to the lesson plan!"))
      .then(() => getAllVideosInLessonPlanFunc());
  };
  
  let handleDeleteVideo = (e: any) => {
    e.preventDefault();
    let lessonPlanVideosId = e.target.value;
    let confirmDelete = confirm("Are you sure you want to remove video?");
    if (confirmDelete) {
      fetch(
        `/api/lessonplans/deleteSingleVideoFromLessonPlan/${lessonPlanVideosId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      ).then(() => getAllVideosInLessonPlanFunc());
    } else {
      return;
    }
  };

  let onMoveChange = (event: any) => {
    let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
    let moveIdAfterSlice = event.target.value.slice(
      whereToSliceFrom,
      event.target.value.length
    );

    setSearchedMoveId(moveIdAfterSlice);
  };

  React.useEffect(() => {
    fetch(`/api/lessonplans/validateToketLessonPlanCreate`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) =>
        fetch(`/api/lessonplans/getAllVideosByTenant/${res.tenant}`)
          .then((res) => res.json())
          .then((res) => setVideosByTenant(res))
          .then(() => getAllVideosInLessonPlanFunc())
      );
  }, []);

  React.useEffect(() => {
    for (let x = 0; x < videosByTenant.length; x++) {
      if (videosByTenant[x].id === Number(searchedMoveId)) {
        setSearchedMoveObject(videosByTenant[x]);
      }
    }
  }, [searchedMoveId]);

  return (
    <>
    <div>
        <Link to={"/CreateALessonPlan"} className='btn btn-primary'>Back to Lesson Plans</Link>
    </div>
      <label className="h4">Search for a specific move to add: </label>
      <input type="text" list="moveList" onChange={onMoveChange} />
      <datalist id="moveList">
        {videosByTenant.map((move) => {
          return (
            <option
              key={move.id}
              value={move.name_of_video + " -+- " + String(move.id)}
            ></option>
          );
        })}
      </datalist>

      <div className="container">
        <h5>{searchedMoveObject.name_of_video}</h5>
        <div className="col-12">
          <iframe
            width="95%"
            height="35%"
            src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_video}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <div>
            <label htmlFor="">Duration of video: </label>
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => setDurationToPlayVideo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Order of video: </label>
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => setOrderOfVideo(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={addToLessonFunc}>
              Add to lesson plan
            </button>
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
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {videosInLessonPlan.map((video) => {
                return (
                  <tr key={video.lpvID}>
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
                        className="btn btn-danger"
                        value={video.lpvID}
                        onClick={handleDeleteVideo}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EditLessonPlan;

interface IAllVideosByTenant {
  id: number;
  tenant: string;
  name_of_video: string;
  url_to_video: string;
  curriculum_level: string;
  created_at: Date;
  url_to_looped_video: string;
  number_for_ordering: number;
  maximum_grade: number;
}
export interface IAllVideosInPlan {
  lpID: number;
  planName: string;
  createdBy: number;
  lpvID: number;
  lengthToDisplay: number;
  orderNumber: number;
  videoID: number;
  tenant: string;
  videoName: string;
  videoURL: string;
  loopedVideoURL: string;
}
