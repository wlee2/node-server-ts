import express, { Request, Response } from "express";
import { UserRegisterDAO } from "../repository/userRepository";
import { userRegistration, userRegisterModelValidator, getUsers } from "../services/userService";
import logger from "../util/logger";
import passport from 'passport';
const router = express.Router();

const temp = {
  id: 1,
  name: "wooseok",
  address: "3 pemberton"
};

//get user information router
router.get("/", (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(400).json({ error: "not login" })
});

router.get("/", (req: Request, res: Response) => {
  getUsers().subscribe(
    users => {
      logger.debug(users);
      res.status(200).json(users);
    },
    err => {
      logger.error(err);
      res.status(400).json({ error: `${err} DB error` });
    }
  )
});

//login router

const tryLocalLogin = (req: Request, res: Response, next: any) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(400).send({ error: err });
    }
    if (!user) {
      return res.status(400).send({ success: false, message: info.message });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return res.status(400).send({ error: loginErr });
      }
      return next();
    });
  })(req, res, next);
};

router.post("/login", tryLocalLogin, (req: Request, res: Response) => {
  res.status(200).send("hihihihi");
});


//register router
router.post("/register", (req: Request, res: Response) => {
  logger.debug(req.body)

  let userRegisterDAO: UserRegisterDAO = new UserRegisterDAO();

  userRegisterModelValidator(req.body, userRegisterDAO).subscribe(
    success => {
      userRegisterDAO = req.body;
      userRegistration(userRegisterDAO).subscribe(
        ok => {
          res.status(200).json({ status: "success" });
        },
        err => {
          logger.error(err);
          res.status(400).send({ error: err });
        }
      )
    },
    err => {
      logger.error(err);
      res.status(400).send({ error: err });
    }
  )
});

export default router;
