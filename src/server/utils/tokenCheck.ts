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

export let hasValidCoachToken: express.RequestHandler = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string
  let decoded: any = decode(token);
  let role = decoded.role;
  let isValidToken = verify(token, config.jwt.secret);

  if (isValidToken && (role === "coach" || role === "admin")) {
    next();
  } else {
    res.status(401).json({
      message: "your token is not valid, or doesn't have coach privlidges",
    });
  }
};

export let hasValidAdminToken: express.RequestHandler = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]; //removes bearer from the string
  let decoded: any = decode(token);
  let role = decoded.role;
  let isValidToken = verify(token, config.jwt.secret);

  if (isValidToken && role === "admin") {
    next();
  } else {
    res.status(401).json({
      message: "your token is not valid, or doesn't have admin privlidges",
    });
  }
};
