import { Query } from "./index";


const createVideo = async (video: any) => {
    return Query(
        `INSERT INTO videos (name_of_video, url_to_video, url_to_looped_video, number_for_ordering, curriculum_level, maximum_grade, tenant) VALUES (?,?,?,?,?,?, 
        (Select tenant from users Where id=?))`,
        [
            video.name_of_video,
            video.url_to_video,
            video.url_to_looped_video,
            video.number_for_ordering,
            video.curriculum_level,
            video.maximum_grade,
            video.UID,
        ]
    );
};
// INSERT INTO videos (name_of_video, url_to_video, url_to_looped_video, number_for_ordering, curriculum_level, maximum_grade, tenant) VALUES (?,?,?,?,?,?, 
//     (Select tenant from users Where id=?))`

const selectAllFromEarnable = async (UID: string | number) => {
    return Query(
        `SELECT * from earnable_items where tenant = (Select tenant from users Where id=?)`,
        [
            UID
        ]

    );
};

const insertIntoEarnablItems = async (userId: number, tenant: string, itemName: string, itemColor: string, PercentagePointsNeeded: number) => {
    return Query(
        'INSERT INTO earnable_items (user_id, tenant, item_name, item_color, percentage_of_total_points_needed) VALUES (?, ?, ?, ?, ?)',
        [
            userId, tenant, itemName, itemColor, PercentagePointsNeeded
        ]
    )
}

const deleteFromEarnablItems = async (itemId: number | string) => {
    return Query(
        'delete from earnable_items where id = ?;',
        [
            itemId
        ]
    )
}

const selectColumnEquals = async (column: string, columnEquals: string | number) => {
    return Query(
        `SELECT * from earnable_items where ??=?`,
        [
            column,
            columnEquals
        ]
    );
};

export default {
    selectAllFromEarnable,
    insertIntoEarnablItems,
    deleteFromEarnablItems,
    selectColumnEquals,
}