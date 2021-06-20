import { Router } from "express";
import db from "./db";

const router = Router();

// router.get("/", async (req, res, next) => {
//   try {
//     let users = await db.users.all();
//     res.json(users);
//     console.log("hey");
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// });

router.get("/:id?", async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (id) {
      res.json(await db.users.singleUser(id));
    } else {
      res.json(await db.users.all());
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
