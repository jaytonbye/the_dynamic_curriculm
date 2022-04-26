import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAllVideosInPlan } from "./EditLessonPlan";

export default function PlayLessonPlan() {
  // let [videosInLessonPlan, setVideosInLessonPlan] = React.useState<
  //   Array<IAllVideosInPlan>
  // >([]);
  let { planId }: any = useParams();
  const [nameOfCurrentVideo, setNameOfCurrentVideo] = React.useState("");
  const [nameOfNextVideo, setNameOfNextVideo] = React.useState("");
  const [timeLeft, setTimeLeft] = React.useState<any>(0);
  const [currentVideo, setCurrentVideo] = React.useState("");

  let y = 0;
  React.useEffect(() => {
    fetch(`/api/lessonplans/getAllVideosInPlan/${planId}`)
      .then((res) => res.json())
      .then((videos: IAllVideosInPlan[]) => {
        let loadVideoFunction = () => {
          if (videos[y]) {
            let timeLeftMSRemoved = videos[y].lengthToDisplay / 1000;

            setCurrentVideo(videos[y].videoURL);
            setNameOfCurrentVideo(videos[y].videoName);
            if (videos[y + 1]) {
              setNameOfNextVideo(videos[y + 1].videoName);
            } else {
              setNameOfNextVideo("");
            }
            y++;
            if (y < videos.length) {
              let countDownFunc = () => {
                if (timeLeftMSRemoved > 0) {
                  setTimeout(() => {
                    timeLeftMSRemoved = timeLeftMSRemoved - 1;
                    setTimeLeft(timeLeftMSRemoved);
                    countDownFunc();
                  }, 1000);
                } else {
                  setTimeLeft("-");
                }
              };
              countDownFunc();

              setTimeout(() => {
                loadVideoFunction();
              }, videos[y - 1].lengthToDisplay);
            }
          }
        };
        loadVideoFunction();
      });
  }, []);

  return (
    <>
      {/* <h1>insert name of video here</h1> */}
      <h1>{nameOfCurrentVideo}</h1>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${currentVideo}?&autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>

      <h3 >Up next: {nameOfNextVideo}</h3>

      <h3>Time Left: {timeLeft}</h3>
      <h2>To-do list: </h2>
      <h3>
        <a href="https://codepen.io/junyuliang/pen/xxGxOJ">
          There is a way to do overlays on embeded youtube videos, checkout this
          link:{" "}
        </a>
      </h3>
      <h5>Is there a way to trigger a buzzer sound?</h5>
      <h5>Size things appropriately</h5>
      <h5></h5>
    </>
  );
}

// export default function PlayLessonPlan() {
//   const [arrayOfYoutubeLinks, setArrayOfYoutubeLinks] = React.useState([
//     "CZxqob5F7MI",
//     "Lz7uMjZWzvU",
//     "6YYGnOK54fo",
//   ]); //hardcoded
//   const [currentVideo, setCurrentVideo] = React.useState("");

//   let arrayOfYoutubeLinks2 = ["CZxqob5F7MI", "Lz7uMjZWzvU", "6YYGnOK54fo"];
//   let y = 0;

//   let loadVideoFunction = () => {
//     setCurrentVideo(arrayOfYoutubeLinks[y]);
//     y++;
//     if (y < arrayOfYoutubeLinks2.length) {
//       setTimeout(() => {
//         loadVideoFunction();
//       }, 3000);
//     }
//   };

//   React.useEffect(() => {
//     loadVideoFunction();
//   }, []);

//   return (
//     <>
//       <h1>insert name of video here</h1>
//       <iframe
//         width="560"
//         height="315"
//         src={`https://www.youtube.com/embed/${currentVideo}?&autoplay=1&mute=1`}
//         title="YouTube video player"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       ></iframe>

//       <h3>Up next: (insert name of video coming next)</h3>

//       <h2>To-do list</h2>
//       <h3>
//         <a href="https://codepen.io/junyuliang/pen/xxGxOJ">
//           There is a way to do overlays on embeded youtube videos, checkout this
//           link:{" "}
//         </a>
//       </h3>
//       <h3>Display a timer showing how much is left in this video</h3>
//       <h5>Is there a way to trigger a buzzer sound?</h5>
//       <h5>Size things appropriately</h5>
//       <h5></h5>
//     </>
//   );
// }
