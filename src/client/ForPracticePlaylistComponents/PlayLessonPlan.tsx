import React from "react";

export default function PlayLessonPlan() {
  const [arrayOfYoutubeLinks, setArrayOfYoutubeLinks] = React.useState([
    "CZxqob5F7MI",
    "Lz7uMjZWzvU",
    "6YYGnOK54fo",
  ]); //hardcoded
  const [currentVideo, setCurrentVideo] = React.useState("");

  let arrayOfYoutubeLinks2 = ["CZxqob5F7MI", "Lz7uMjZWzvU", "6YYGnOK54fo"];
  let y = 0;

  let loadVideoFunction = () => {
    setCurrentVideo(arrayOfYoutubeLinks[y]);
    y++;
    if (y < arrayOfYoutubeLinks2.length) {
      setTimeout(() => {
        loadVideoFunction();
      }, 3000);
    }
  };

  React.useEffect(() => {
    loadVideoFunction();
  }, []);

  return (
    <>
      <h1>insert name of video here</h1>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${currentVideo}?&autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>

      <h3>Up next: (insert name of video coming next)</h3>

      <h2>To-do list</h2>
      <h3>
        <a href="https://codepen.io/junyuliang/pen/xxGxOJ">
          There is a way to do overlays on embeded youtube videos, checkout this
          link:{" "}
        </a>
      </h3>
      <h3>Display a timer showing how much is left in this video</h3>
      <h5>Is there a way to trigger a buzzer sound?</h5>
      <h5>Size things appropriately</h5>
      <h5></h5>
    </>
  );
}
