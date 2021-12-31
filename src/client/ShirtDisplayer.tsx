import React from 'react'
import { useState, useEffect } from 'react';

<<<<<<< HEAD
interface Props { }
=======

interface Props {

}
>>>>>>> parent of 48aaa04 (waynes code review checks out)

const ShirtDisplayer: React.FC<Props> = () => {
  let UID = sessionStorage.getItem("UID");
  const token = sessionStorage.getItem("token");

  const [itemsPlease, setItems] = useState([]);

  React.useEffect(() => {
    fetch(`/api/earnableItems/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((coding) => {
        console.log(coding)
        setItems(coding)
        console.log(coding)
      })
      .catch((err) => {
        console.log(err);
      });

  }, [])

  const onDeleteItem = (id: number) => {
    let token = sessionStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id, //check to see if this can just be id
      }),
    };
    fetch(`/api/earnableItems/delete/${id}`, requestOptions).then((res) => {
      if (res.ok) {
        alert("Video deleted");
        window.location.reload();
      } else {
        alert("it didn't work!");
      }
    });
  };


  return (
    <div className='row'>
      <table className='table w-75 mx-auto'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Item Color</th>
            <th>Name</th>
            <th>% of total points</th>
          </tr>
        </thead>
        <tbody>
          {itemsPlease.map((move) => {
            return (
              <tr key={move.id}>
                <td>{move.id}</td>
                <td>{move.item_color}</td>
                <td>{move.item_name}</td>
                <td>{move.percentage_of_total_points_needed}</td>
                {/* <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => onEditMove(move.id)}
                                    >
                                        Submit Update
                                    </button>
                                </td> */}
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteItem(move.id)}
                  >
                    Delete!
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ShirtDisplayer;