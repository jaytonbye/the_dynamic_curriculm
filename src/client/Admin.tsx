import React from "react";

function Admin() {
  const [moveName, setMoveName] = React.useState("");
  const [moveUrl, setMoveUrl] = React.useState("");
  const [moveLoopedUrl, setMoveLoopedUrl] = React.useState("");
  const [curriculumLevel, setCurriculumLevel] = React.useState("");

  const onMoveNameChange = (event: any) => {
    setMoveName(event.target.value);
  };
  const onMoveUrlChange = (event: any) => {
    setMoveUrl(event.target.value);
  };
  const onMoveLoopedUrlChange = (event: any) => {
    setMoveLoopedUrl(event.target.value);
  };
  const onCurriculumLevelChange = (event: any) => {
    setCurriculumLevel(event.target.value);
  };

  const onSubmitMove = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name_of_video: moveName,
        url_to_video: moveUrl,
        url_to_looped_video: moveLoopedUrl,
        curriculum_level: curriculumLevel,
        // Is there a way I can use type checking here?
      }),
    };
    fetch("http://localhost:3000/api/videos", requestOptions);
    alert("video submitted"); //this will currently run even if the submission fails.
    // is there a simple way to automatically navigate to the homepage after the alert?
  };

  return (
    <>
      <h1>admin page where we will add videos</h1>
      <form>
        <label htmlFor="">Name of Move: </label>
        <input type="text" onChange={onMoveNameChange} />
        <br />
        <label htmlFor="">Url to corresponding youtube video: </label>
        <input type="text" onChange={onMoveUrlChange} />
        <br />
        <label htmlFor="">
          Url to looped version of corresponding youtube video:
        </label>
        <input type="text" onChange={onMoveLoopedUrlChange} />
        <br />
        <label htmlFor="">Insert into curriculum level: </label>
        <input type="number" onChange={onCurriculumLevelChange} />
        <br />
        <button
          id="submitButton"
          className="btn btn-success"
          onClick={onSubmitMove}
        >
          Submit New Move
        </button>
      </form>
    </>
  );
}

export default Admin;
