import React from "react";
import Move from "./Move";
import SingleLevel from "./SingleLevel";

function WrestlersView() {
  return (
    <>
      <h1>Wrestler's view page</h1>
      <h2>Name of wrestler</h2>
      <h3>Total points</h3>
      <h3>
        List of Levels (with link)/ Points Earned / Total Points Available
      </h3>
      <SingleLevel />
      <Move />
      <Move />
    </>
  );
}

export default WrestlersView;
