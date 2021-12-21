import db from "../db";
import { Router } from "express";
import { hasValidCoachToken } from "../utils/tokenCheck";
import { hasValidAdminToken } from "../utils/tokenCheck";

const router = Router();

// takes uid from session storage
router.get("/", async (req, res, next) => {
    try {
        res.json(await db.EarnableItemsQueries.selectAllFromEarnable(21));
    } catch (error) {
        console.log(error)
    }
}
)

// takes user id, tenant, clothing, color, and percent
router.post("/insert", hasValidAdminToken, async (req, res, next) => {
    try {
        res.json(await db.EarnableItemsQueries.insertIntoEarnablItems(106, 'notDynamic', "thong", "black", 10));
    } catch (error) {
        console.log(error)
    }
}
)

// takes item id
router.delete("/delete/:id", hasValidAdminToken, async (req, res, next) => {
    const userId = req.params.id;

    try {
        res.json(await db.EarnableItemsQueries.deleteFromEarnablItems(userId));
    } catch (error) {
        console.log(error)
    }
}
)


router.get("/specific", hasValidAdminToken, async (req, res, next) => {
    try {
        res.json(await db.EarnableItemsQueries.selectColumnEquals('item_color', 'black'));
    } catch (error) {
        console.log(error)
    }
}
)


// router.post("/", hasValidCoachToken, async (req, res) => {
//     let notes = req.body.notes;
//     let from_coach = req.body.from_coach;
//     let for_wrestler = req.body.for_wrestler;
//     try {
//         res.json(
//             await db.EarnableItemsQueries.createNote(
//                 notes,
//                 from_coach,
//                 for_wrestler
//             )
//         );
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

export default router;