import { json } from "express";
import * as React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ContextExclusionPlugin } from "webpack";
import NavigationBar from "../NavigationBar";

let EditLessonPlan = () => {
  ///DROPDOWN START
  let [displayDropDown, setDisplayDropDown] = React.useState(false);
  let [dropDownInputValue, setDropDownInputValue] = React.useState("");
  let wrapperRef = React.useRef(null); //this closes autocomplete list when mouse clicks off of it
  ///DROP END

  let [lessonPlanName, setLessonPlanName] = React.useState<string>();
  let [lessonPlanNewName, setLessonPlanNewName] = React.useState<string>();
  let [videosByTenant, setVideosByTenant] = React.useState([]);
  let [videosInLessonPlan, setVideosInLessonPlan] = React.useState<
    Array<IAllVideosInPlan>
  >([]);
  let [searchedMoveId, setSearchedMoveId] = React.useState();
  let [searchedMoveObject, setSearchedMoveObject] = React.useState<any>({});
  let [durationToPlayVideo, setDurationToPlayVideo] = React.useState("");
  let [orderOfVideo, setOrderOfVideo] = React.useState("");
  let { planId }: any = useParams();
  let token = localStorage.getItem("token");

  let getPlanInfo = () => {
    fetch(`/api/lessonplans/getLessonPlanInfo/${planId}`)
      .then((res) => res.json())
      .then((res: IPlanInfo[]) => {
        setLessonPlanName(res[0].name_of_lesson_plan);
        setLessonPlanNewName(res[0].name_of_lesson_plan);
      });
  };

  let getAllVideosInLessonPlanFunc = () => {
    fetch(`/api/lessonplans/getAllVideosInPlan/${planId}`)
      .then((res) => res.json())
      .then((res) => setVideosInLessonPlan(res));
  };

  let addToLessonFunc = () => {
    if (!searchedMoveId) return alert("Select a move");
    if (!durationToPlayVideo || !Number(durationToPlayVideo))
      return alert("Set duration");
    if (!orderOfVideo || !Number(orderOfVideo)) return alert("Set order");
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

  let handleLessonPlanNameChange = (e: any) => {
    e.preventDefault();
    if (!lessonPlanNewName.trim()) return alert("Enter a plan name");
    fetch(`/api/lessonplans/putLessonPlanNewName`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newLessonPlanName: lessonPlanNewName,
        planId,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert(res.message))
      .then(() => getPlanInfo());
  };

  // let onMoveChange = (event: any) => {
  //   // console.log("yp")
  //   console.log(event.target);
  //   let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
  //   let moveIdAfterSlice = event.target.value.slice(
  //     whereToSliceFrom,
  //     event.target.value.length
  //   );

  //   setSearchedMoveId(event.target.value);
  // };

  React.useEffect(() => {
    fetch(`/api/lessonplans/validateToketLessonPlanCreate`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) =>
        fetch(`/api/lessonplans/getAllVideosByTenant/${res.tenant}`)
          .then((res) => res.json())
          .then((res) => setVideosByTenant(res))
          .then(() => getPlanInfo())
          .then(() => getAllVideosInLessonPlanFunc())
      );
  }, []);

  //DROPDOWN START
  React.useEffect(() => {
    for (let x = 0; x < videosByTenant.length; x++) {
      if (videosByTenant[x].id === Number(searchedMoveId)) {
        setSearchedMoveObject(videosByTenant[x]);
      }
    }
  }, [searchedMoveId]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickedOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickedOutsideDropdown);
    };
  }, []);

  let handleClickedOutsideDropdown = (e: any) => {
    let { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplayDropDown(false);
    }
  };
  //DROPDOWN END

  return (
    <>
      <NavigationBar />

      <div className="m-3" style={{ paddingBottom: "10rem" }}>
        <div>
          <Link to={"/CreateALessonPlan"} className="btn btn-primary">
            Back to Lesson Plans
          </Link>
        </div>

        <div className="mt-5 text-center">
          <h3>
            <strong>Lesson plan:</strong>{" "}
            <input
              onChange={(e) => setLessonPlanNewName(e.target.value)}
              type="text"
              defaultValue={lessonPlanName}
            />
            <button
              onClick={handleLessonPlanNameChange}
              className="btn btn-success"
            >
              Update plan name
            </button>
          </h3>
        </div>
        <hr />
        {/* ///DROPDOWN START */}
        <div className="d-flex flex wrap justify-content-center">
          <div
            style={{ width: "400px" }}
            className="d-flex flex-wrap justify-content-center align-items-center"
          >
            <label className="h4 ">Select a move:</label>
            <div ref={wrapperRef}>
              <input
                style={{ maxWidth: "200px" }}
                type="text"
                onClick={() => {
                  !dropDownInputValue
                    ? setDisplayDropDown(true)
                    : setDisplayDropDown(false);
                }}
                value={dropDownInputValue}
                onChange={(event: any) => {
                  setDropDownInputValue(event.target.value);
                  setDisplayDropDown(true);
                }}
              />
              {displayDropDown && (
                <div
                  className="auto-container"
                  style={{
                    whiteSpace: "nowrap",
                    backgroundColor: "white",
                    maxWidth: "200px",
                    maxHeight: "190px",
                    overflow: "scroll",
                    position: "absolute",
                    zIndex: 1,
                  }}
                >
                  {videosByTenant
                    .filter(
                      ({ name_of_video }) =>
                        name_of_video
                          .toLowerCase()
                          .indexOf(dropDownInputValue.toLowerCase()) > -1
                    )
                    .map((move) => {
                      return (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setDropDownInputValue(move.name_of_video);
                            setSearchedMoveId(move.id);
                            setDisplayDropDown(false);
                          }}
                          key={move.id}
                          tabIndex={0}
                        >
                          <span>{move.name_of_video}</span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* DROPDOWN END  */}
        {/* <div className="text-center">
          <label className="h4 mt-5 mb-5 mr-2">Select a move:</label>
          <input type="text" list="moveList" onChange={onMoveChange} />
          <datalist id="moveList">
            {videosByTenant.map((move) => {
              return (
                <option
                  key={move.id}
                  id={move.id}
                  // defaultValue={move.name_of_video}
                  value={move.id}
                >
                  {move.name_of_video}
                </option>
              );
            })}
          </datalist>
        </div> */}

        <div className="container">
          <h5>{searchedMoveObject.name_of_video}</h5>
          <div className="col-12">
            <div>
              <iframe
                className="mb-2"
                width="100%"
                height="65%"
                src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_video}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
              <h6>Looped:</h6>
              <iframe
                className="mb-2"
                width="100%"
                height="65%"
                src={`https://www.youtube.com/embed/${searchedMoveObject.url_to_looped_video}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="d-flex align-items-center">
                <label htmlFor="">Duration of video (seconds): </label>
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setDurationToPlayVideo(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center">
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
          </div>

          <hr className="mb-5" />
          <div className="sticky-top bg-white">
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Move</th>
                  <th>Video</th>
                  <th>Looped Video</th>
                  <th>Duration</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {videosInLessonPlan.map((video) => {
                  return (
                    <tr key={video.lpvID}>
                      <td>{video.orderNumber}</td>
                      <td className="col-3">{video.videoName}</td>

                      <td className="col-5">
                        <iframe
                          width="95%"
                          height="45%"
                          src={`https://www.youtube.com/embed/${video.videoURL}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                        ></iframe>
                      </td>

                      <td className="col-5">
                        <iframe
                          width="95%"
                          height="45%"
                          src={`https://www.youtube.com/embed/${video.loopedVideoURL}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                        ></iframe>
                      </td>

                      <td>{video.lengthToDisplay} seconds</td>
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

interface IPlanInfo {
  created_by: number;
  date_created: string;
  id: number;
  name_of_lesson_plan: string;
  tenant: string;
}
