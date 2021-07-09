import * as express from "express";
import { verify, decode } from "jsonwebtoken";
import config from "../config";

export let hasValidToken: express.RequestHandler = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string
  let isValidToken = verify(token, config.jwt.secret);
  if (isValidToken) {
    next();
  } else {
    res.status(401).json({ message: "your token is not valid" });
  }
};

export let hasValidAdminToken: express.RequestHandler = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string
  let decoded = decode(token);
  let roll = decoded.roll;
  let isValidToken = verify(token, config.jwt.secret);

  if (isValidToken && roll === "admin") {
    next();
  } else {
    res
      .status(401)
      .json({
        message: "your token is not valid, or doesn't have admin privlidges",
      });
  }
};
