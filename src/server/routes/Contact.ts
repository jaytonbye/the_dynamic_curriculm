import { Router } from "express";
import * as FormData from "form-data";
//@ts-ignore
import * as Mailgun from "mailgun.js";
import MailGun from "mailgun.js";
import config from "../config";

const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
  username: "api",
  key: config.mailgun.apiKey,
});

const router = Router();

router.get("/here", (req, res, next) => {
  res.json("hey you guys!!!");
});

router.post("/", async (req, res) => {
  const newEmail = req.body;
  console.log({ newEmail });
  try {
    const result = await mailgun.messages.create(config.mailgun.domain, {
      to: newEmail.to,
      subject: newEmail.subject,
      from: config.mailgun.fromEmail,
      text: newEmail.message,
      html: newEmail.html,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something didn't work in contact form" });
  }
});

export default router;
