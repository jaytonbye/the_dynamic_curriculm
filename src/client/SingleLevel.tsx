import React from "react";

function SingleLevel() {
  const [moves, setMoves] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((results) => {
        setMoves(results);
      });
  }, []);
  console.log(moves);
  return (
    <>
      <h1>
        this is a single instance of a level, we are using level 1 until we can
        code for each level
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
            console.log(move.curriculum_level);
            if (move.curriculum_level === 1) {
              return (
                <tr>
                  <td>yo</td>
                  <td>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/ZcbTLaB8Tfw"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </td>
                  <td>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/Y44pa2CGplc"
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
