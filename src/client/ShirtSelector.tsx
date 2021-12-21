import React from "react";
// let userID = data.UID;

const ShirtSelector: React.FC = () => {



    // Add an item to the database

    // const onSubmitItem = () => {
    //     let token = sessionStorage.getItem("token");
    //     let UID = Number(sessionStorage.getItem("UID"));
    //     const requestOptions = {
    //         method: "POST",
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
    //             maximum_grade: maximum_grade,
    //             UID: UID,
    //         }),
    //     };
    //     fetch("/api/videos", requestOptions).then((res) => {
    //         if (res.ok) {
    //             alert("Video added");
    //         } else {
    //             alert("it didn't work!");
    //         }
    //     });
    // };

    // potentially edeit a item

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

    const onDeleteMove = (id: number) => {
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


    return (
        <>

        </>
    );
}

export default ShirtSelector;