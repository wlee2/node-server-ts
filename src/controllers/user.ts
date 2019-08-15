import express, { Request, Response } from "express";
import { UserRegisterDAO } from "../repository/userRepository";
import { userRegistration, getUserInfo } from "../services/userService";
import logger from "../util/logger";
import ModelValidator from "../util/validator";
import { tryLocalLogin } from "../passport/localLogin";
import jwt from "jsonwebtoken";
import { Authorize } from "../services/auth";
import { User } from "../models/userModel";

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
  const token = jwt.sign({ email: req.user.email }, process.env.SESSION_SECRET, { algorithm: 'HS512', expiresIn: '1d' });
  res.status(200).json({
    success: true,
    token: token
  })
});

//register router
router.post("/register", (req: Request, res: Response, next) => {
  logger.debug(req.body);
  let userRegisterDAO: UserRegisterDAO = new UserRegisterDAO();
  ModelValidator(req.body, userRegisterDAO, (err: any) => {
    if (err) {
      logger.error(err);
      res.status(400).send({ error: err });
    }
    else {
      userRegisterDAO = req.body;
      userRegistration(userRegisterDAO).subscribe(
        ok => {
          res.status(200).send({ status: "success" });
        },
        err => {
          res.status(400).send({ error: err });
          logger.error(err);
        }
      )
    }
  });
});

router.get('/review', Authorize, (req: Request, res: Response, next) => {
  User.findOne({ email: req.user.email }).populate('ReviewData')
    .then(user => {
      res.status(200).send(user.ReviewData);
    })
    .catch(error => {
      res.status(400).send({ error: error });
    })
});

export default router;
