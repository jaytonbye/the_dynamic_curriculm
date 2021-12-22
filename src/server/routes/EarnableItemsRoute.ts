import db from "../db";
import { Router } from "express";
import { hasValidCoachToken } from "../utils/tokenCheck";
import { hasValidAdminToken } from "../utils/tokenCheck";

const router = Router();

// takes uid from session storage and give matching tenant items
router.get("/:id", async (req, res, next) => {
    const ID = Number(req.params.id);
    try {
        res.json(await db.EarnableItemsQueries.selectAllFromEarnable(ID));
    } catch (error) {
        console.log(error)
    }
}
)

// takes user id, tenant, clothing, color, and percent
router.post("/insert", hasValidAdminToken, async (req, res, next) => {
    const Body = req.body;

    try {
        res.json(await db.EarnableItemsQueries.insertIntoEarnablItems(Body.userId, Body.tenant, Body.clothing, Body.color, Body.percent));
    } catch (error) {
        console.log(error)
    }
}
)

// takes item id deletes item
router.delete("/delete/:id", hasValidAdminToken, async (req, res, next) => {
    const itemId = Number(req.params.id);

    try {
        res.json(await db.EarnableItemsQueries.deleteFromEarnablItems(itemId));
    } catch (error) {
        console.log(error)
    }
}
)

// This takes colum and value and returns matching results

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