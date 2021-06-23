import React from "react";
import { useParams } from "react-router-dom";

//why am I not using typing here?

function SingleLevel() {
  const [moves, setMoves] = React.useState([]);

  let { level } = useParams();

  //gets us all of the moves in all levels.
  React.useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((results) => {
        setMoves(results);
      });
  }, []);

  return (
    <>
      <h1>
        You are currently viewing level {level} of the Dynamic Wrestling
        Curriculum
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th>Move</th>
            <th>Video</th>
            <th>Looped Video</th>
            <th>Points earned</th>
            <th>Points available</th>
          </tr>
        </thead>
        <tbody>
          {moves.map((move) => {
            if (move.curriculum_level === Number(level)) {
              return (
                <tr>
                  <td>{move.name_of_video}</td>
                  <td>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${move.url_to_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </td>
                  <td>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${move.url_to_looped_video}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </td>
                  <td>Your grade here</td>
                  <td>Potential grades here</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}

export default SingleLevel;
