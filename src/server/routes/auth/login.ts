import * as jwt from "jsonwebtoken";
import db from "../../db";
import config from "../../config";
import { Router } from "express";
import { compareHash } from "../../utils/passwords";

const router = Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    //check for users email
    const [userFound] = await db.users.find("email", email);

    //if they have an email, and if their password is the hashed pw in the db
    if (userFound && compareHash(password, userFound.password)) {
      const token = jwt.sign(
        {
          userId: userFound.id,
          email: userFound.email,
          role: userFound.role,
          tenant: userFound.tenant,
        },
        config.jwt.secret,
        { expiresIn: "1d" }
      );

      let UID = userFound.id;
      res.json({ token, UID });
      return;
    }
    res.status(401).json({ message: "invalid credentials" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "my code is trash" });
  }
});

export default router;
