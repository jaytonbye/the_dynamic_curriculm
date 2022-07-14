import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

/* 
  The following interfaces are the various response structures
  fetched from the several endpoints.  Add properties as needed.
*/

interface AllCurrentGradesForWrestler {
  id?: number;
  maximum_grade?: number;
  grade?: number;
}

interface PersonalInfo {
  first_name?: string;
  last_name?: string;
}

interface EarnableItems {
  id?: number;
  percentage_of_total_points_needed?: number;
  item_name?: string;
  item_color?: string;
}

interface AllUserVideos {
  id?: number;
  maximum_grade?: number;
}

/*
  This interface represents all the state of this component
  batched into one object.  This helps prevent unecessary re-renders
  and prevents state from falling out of sync.
*/

interface ComponentState {
  personalInfo: PersonalInfo;
  earnableItems: EarnableItems[];
  totalPointsEarnedByWrestler: number;
  totalPointsAvailable: number;
  currentItemEarned: string;
  nextItemToBeEarned: string;
  loading: boolean;
}

/*
  This interface represents the arguments for the two utility 
  functions used to calculate the earned and next items to display
*/

interface CalcArguments {
  earnableItems: EarnableItems[];
  totalPointsAvailable: number;
  totalPointsEarnedByWrestler: number;
}

/*
  Utility function meant to obtain the current earned item
*/

export default function TestCard(props: { UID: number }) {
  let token = localStorage.getItem("token");

  // We use these two pieces of state to calculate points till next Item
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsAvailableForNextItem, setPointsAvailableForNextItem] = useState(
    0
  );

  // one batched state to control unecessary re-renders
  // added a loading property to guarentee useEffect labeled "2"
  // only runs one time per card
  const [state, setState] = useState<ComponentState>({
    personalInfo: {
      first_name: "not yet loaded",
      last_name: "not yet loaded",
    },
    earnableItems: [],
    totalPointsEarnedByWrestler: 0,
    totalPointsAvailable: 1,
    currentItemEarned: "default item",
    nextItemToBeEarned: "You did it!",
    loading: true,
  });

  function calcCurrentItem({
    earnableItems,
    totalPointsAvailable,
    totalPointsEarnedByWrestler,
  }: CalcArguments) {
    let pointsRequiredToEarnThisItem = 0;
    let itemIndex = 0;
    if (earnableItems.length === 0) {
      alert("No items to earn");
      return "";
    }
    for (let x = 0; x < earnableItems.length; x++) {
      pointsRequiredToEarnThisItem =
        (earnableItems[x].percentage_of_total_points_needed *
          totalPointsAvailable) /
        100;

      if (totalPointsEarnedByWrestler >= pointsRequiredToEarnThisItem) {
        itemIndex = x;
      }
    }
    setPointsEarned(totalPointsEarnedByWrestler);
    return `${earnableItems[itemIndex].item_color} ${earnableItems[itemIndex].item_name}`;
  }

  /*
    Utility function meant to obtain the next earnable item
  */

  function calcNextItem({
    earnableItems,
    totalPointsAvailable,
    totalPointsEarnedByWrestler,
  }: CalcArguments) {
    let pointsRequiredToEarnThisItem = 0;
    let itemIndex = 0;
    if (earnableItems.length === 0) {
      return;
    }
    for (let x = 0; x < earnableItems.length; x++) {
      pointsRequiredToEarnThisItem =
        (earnableItems[x].percentage_of_total_points_needed *
          totalPointsAvailable) /
        100;
      if (totalPointsEarnedByWrestler < pointsRequiredToEarnThisItem) {
        itemIndex = x;
        break;
      }
    }
    const nextItemsPointsRequired = Math.ceil(
      (earnableItems[itemIndex].percentage_of_total_points_needed / 100) *
        totalPointsAvailable
    );
    setPointsAvailableForNextItem(nextItemsPointsRequired);
    return `${earnableItems[itemIndex].item_color} ${earnableItems[itemIndex].item_name}`;
  }
  // useEffect 1
  // batched fetch of all info
  // Promise.all allows us to run all the fetch requests in parallel
  // it returns an array that I map over and res.json each response
  // and then I have the final array of all fetched data grouped
  React.useEffect(() => {
    Promise.all([
      fetch(`/api/personal_info/person/${props.UID}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`/api/earnableItems/${props.UID}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`/api/grades/allCurrentGradesForASingleWrestler/${props.UID}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`/api/videos/${props.UID}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then((resArray) =>
        Promise.all(
          resArray.map((res) => {
            if (res.status === 500) {
              alert("Internal Server Error");
            } else {
              return res.json();
            }
          })
        )
      )
      .then(([personalInfo, earnableItems, wrestlerGrades, videos]: any) => {
        // get total points earned
        console.log({ personalInfo, earnableItems, wrestlerGrades, videos });
        const totalPoints = wrestlerGrades.reduce(
          (total: number, currentWrestler: AllCurrentGradesForWrestler) =>
            (total += currentWrestler.grade),
          0
        );

        // get total points available
        const totalPointsAv = videos.reduce(
          (total: number, video: AllUserVideos) =>
            (total += video.maximum_grade),
          0
        );

        // one batched setState that also toggles loading to false
        setState((prev) => ({
          ...prev,
          personalInfo: personalInfo[0],
          earnableItems,
          totalPointsEarnedByWrestler: totalPoints,
          totalPointsAvailable: totalPointsAv,
          loading: false,
        }));
      })
      .catch((e) => alert(e.message));
  }, []);

  // useEffect 2
  // if statement prevents running until all data is fetched and set
  // it calulates the current and next earned items
  // and sets them to state at the same time
  React.useEffect(() => {
    if (state.loading) return;

    //is the object destructuring
    const {
      earnableItems,
      totalPointsAvailable,
      totalPointsEarnedByWrestler,
    } = state;

    const currentItemEarned = calcCurrentItem({
      earnableItems,
      totalPointsAvailable,
      totalPointsEarnedByWrestler,
    });
    const nextItemToBeEarned = calcNextItem({
      earnableItems,
      totalPointsAvailable,
      totalPointsEarnedByWrestler,
    });

    setState((prev: any) => ({
      ...prev,
      currentItemEarned,
      nextItemToBeEarned,
    }));
  }, [state.loading]); // <- ensures this only re-runs on that boolean toggling and never again

  // we switched the order of what we test here

  const returnsEarnableItemsOrNothingIfNoItemsToEarnFunc: any = (
    earningItemsForFunc: Array<EarnableItems>
  ) => {
    if (!earningItemsForFunc.length) {
      return <h3>No Items to earn</h3>;
    } else {
      return (
        <ListGroup className="my-3">
          {earningItemsForFunc.map((item) => (
            <ListGroup.Item
              key={`key-${item.id}-${props.UID}`}
              className="py-3 d-flex justify-content-between align-items-center"
            >
              <span>
                {item.item_color} {item.item_name}
              </span>
              <span>
                {Math.ceil(
                  (item.percentage_of_total_points_needed *
                    state.totalPointsAvailable) /
                    100
                )}{" "}
                <small className="text-muted">stars required</small>
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="flex-column d-flex justify-content-center align-items-center">
          <span className="fw-bolder fs-5">
            {state.personalInfo.first_name} {state.personalInfo.last_name}
          </span>
          <small className="text-muted">Wrestler Dashboard</small>
        </Card.Header>
        <Card.Body>
          <Card.Title className="fw-light">Earnable Items</Card.Title>

          {returnsEarnableItemsOrNothingIfNoItemsToEarnFunc(
            state.earnableItems
          )}

          <Card.Text>
            You have earned <strong>{state.totalPointsEarnedByWrestler}</strong>{" "}
            of <strong>{state.totalPointsAvailable}</strong> total available
            stars.
          </Card.Text>
          <Card.Text>
            <small className="text-muted">current item earned</small>{" "}
            <strong>{state.currentItemEarned}</strong>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <span className="fst-italic text-dark">
            Only <strong>{pointsAvailableForNextItem - pointsEarned}</strong>{" "}
            more stars until you earn your{" "}
            <strong>{state.nextItemToBeEarned}!</strong>
          </span>
        </Card.Footer>
      </Card>
    </>
  );
}
