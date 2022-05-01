import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAllVideosInPlan } from "./EditLessonPlan";

export default function PlayLessonPlan() {
  let { planId }: any = useParams();
  let [nameOfCurrentVideo, setNameOfCurrentVideo] = React.useState("");
  let [nameOfNextVideo, setNameOfNextVideo] = React.useState("");
  let [timeLeft, setTimeLeft] = React.useState<any>(0);
  let [movesRemaining, setMovesRemaining] = React.useState<number>(0);
  let [currentVideo, setCurrentVideo] = React.useState("");

  let y = 0;
  React.useEffect(() => {
    fetch(`/api/lessonplans/getAllVideosInPlan/${planId}`)
      .then((res) => res.json())
      .then((videos: IAllVideosInPlan[]) => {
        let loadVideoFunction = () => {
          if (videos[y]) {
            setMovesRemaining(videos.length - y - 1);
            let timeLeftMSRemoved = videos[y].lengthToDisplay;
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
                    setTimeLeft(timeLeftMSRemoved.toFixed(0));
                    countDownFunc();
                  }, 1000);
                } else {
                  // let sound = new Audio("/bell.mp3");
                  // sound.play(); // trouble with htis ill come bac
                  setTimeLeft("-");
                }
              };
              countDownFunc();

              setTimeout(() => {
                loadVideoFunction();
              }, videos[y - 1].lengthToDisplay * 1000);
            }
          }
        };
        loadVideoFunction();
      });
  }, []);

  return (
    <>
      <div>
        <div
          className="text-center"
          style={{
            position: "absolute",
            zIndex: -5,
            height: "100%",
            width: "100%",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentVideo}?&autoplay=1&mute=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>

        <div
          className="d-flex flex-wrap h-100 text-dark col-12"
          style={{
            padding: "0%",
            opacity: "75%",
          }}
        >
          <div className="col-12">
            <h1 className="bg-light col-12">{nameOfCurrentVideo}</h1>
          </div>

          <div
            className=" d-flex align-items-end flex-wrap col-12 pb-5"
            style={{
              opacity: "75%",
            }}
          >
            <h3 className="col-1 bg-light">Time Left: {timeLeft}</h3>
            <div className="col-12 p-0">
              <h3 className="col-2 bg-light">
                Movies Remaining: {movesRemaining}
              </h3>
            </div>
            <h5 className="col-12 bg-light text-small">
              Up next: {nameOfNextVideo}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
