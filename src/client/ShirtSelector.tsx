import React from "react";
import { useState, useEffect } from 'react';
// let userID = data.UID;

const ShirtSelector: React.FC = ({ statesFromAddItemAdminPage, setStatesFromAddItemAdminPage }: any) => {

    // const [clothing, setClothing] = useState("");
    // const [color, setColor] = useState("");
    // const [percent, setPercent] = useState<number | string>(0);
    //  don't know why I needed to put a string there


    // Add an item to the database

    const onSubmitItem = () => {
        let token = sessionStorage.getItem("token");
        let UID = Number(sessionStorage.getItem("UID"));
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
                "userId": UID,
                "tenant": UID,
                "clothing": statesFromAddItemAdminPage.clothing,
                "color": statesFromAddItemAdminPage.color,
                "percent": statesFromAddItemAdminPage.percent
            }),
        };
        fetch("/api/earnableItems/insert", requestOptions).then((res) => {
            if (res.ok) {
                alert("Item added");
            } else {
                alert("it didn't work!");
            }
        });
    };

    // potentially edit a item

    // const onEditMove = (id: number) => {
    //     let token = sessionStorage.getItem("token");
    //     const requestOptions = {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({
    //             name_of_video: moveName,
    //             url_to_video: moveUrl,
    //             url_to_looped_video: moveLoopedUrl,
    //             number_for_ordering: numberForOrdering,
    //             curriculum_level: curriculumLevel,
    //             id: id,
    //             maximum_grade: maximum_grade,
    //             // Is there a way I can use type checking here?
    //         }),
    //     };
    //     fetch(`/api/videos/`, requestOptions).then((res) => {
    //         if (res.ok) {
    //             alert("Video updated!");
    //             window.location.reload();
    //         } else {
    //             alert("it didn't work!");
    //         }
    //     });
    // };

    // Delete an item

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
                alert("Row deleted");
                window.location.reload();
            } else {
                alert("it didn't work!");
            }
        });
    };

    //Gets us all of the Shirts matching The tenant.
    const [Items, setItems] = React.useState([]);

    React.useEffect(() => {
        fetch('./Objects.json')
            .then((res) => res.json())
            .then((Items) => setItems(Items))
            .catch((err) => {
                console.log(err);
            });

    }, [])

    console.log()

    return (
        <>
            <h1 className="text text-center">Add an Item</h1>
            <div className="row sticky-top bg-white ml-2 mt-2">
                <form className="mx-auto form-group w-50">
                    <label htmlFor="itemName">Name of Item: </label>
                    <input type="text" className="form-control" id="itemName" onChange={(e) => setStatesFromAddItemAdminPage.setClothing(e.target.value)} />
                    <br />
                    <label htmlFor="itemColor">Color of item</label>
                    <input type="text" className="form-control" id="itemColor" onChange={(e) => setStatesFromAddItemAdminPage.setColor(e.target.value)} />
                    <br />
                    <label htmlFor="itemPercent">
                        Percent of total points till earned
                    </label>
                    <input type="number" className="form-control" id="itemPercent" min="0" max="100" onChange={(e) => setStatesFromAddItemAdminPage.setPercent(e.target.value)} />
                    <br />
                    <button
                        id="submitNewItemButton"
                        className="btn btn-success"
                        onClick={onSubmitItem}
                    >
                        Submit New Item
                    </button>
                </form>
            </div>
        </>
    );
}

export default ShirtSelector;