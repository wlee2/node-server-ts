import passport from "passport";
import {Request, Response, NextFunction} from "express";

export const tryLocalLogin = (req: Request, res: Response, next: NextFunction) => {
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