import express, { Request, Response } from "express";
import { UserRegisterDAO } from "../repository/userRepository";
import { userRegistration, getUserInfo } from "../services/userService";
import logger from "../util/logger";
import ModelValidator from "../util/validator";
import { tryLocalLogin } from "../passport/localLogin";
import jwt from "jsonwebtoken";
import { Authorize } from "../services/auth";

const router = express.Router();

// //get user information router
router.get("/", Authorize, (req: any, res: Response) => {
  getUserInfo(req.user.email).subscribe(
    user => {
      res.status(200).json(user);
    },
    err => {
      logger.error(err);
      res.status(400).json({ error: `${err} --> DB error` });
    }
  )
});


//login router
router.post("/login", tryLocalLogin, (req: Request, res: Response, next) => {
  const token = jwt.sign({ email: req.user.email }, process.env.SESSION_SECRET, { algorithm: 'HS512', expiresIn: '2h' });
  //res.status(200).cookie('token', token, {maxAge: 1000 * 60 * 60 * 5, httpOnly: true}).send({success: true});
  res.status(200).json({
    success: true,
    token: token
  })
});

// router.get('/testing', (req, res, next) => {
//   res.status(200).cookie('token', "giiggigigii", {maxAge: 1000 * 60 * 60 * 5, httpOnly: true, signed: true}).send({success: true});
// })


//register router
router.post("/register", (req: Request, res: Response, next) => {
  let userRegisterDAO: UserRegisterDAO = new UserRegisterDAO();
  ModelValidator(req.body, userRegisterDAO, (err: any) => {
    if (err) {
      logger.error(err);
      return res.status(200).send({ error: err });
    }
    userRegisterDAO = req.body;
  });
  userRegistration(userRegisterDAO).subscribe(
    ok => {
      res.status(200).json({ status: "success" });
    },
    err => {
      logger.error(err);
      res.status(400).send({ error: err });
    }
  )
});

export default router;
