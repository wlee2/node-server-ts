import express, { Request, Response } from "express";
import { UserRegisterDAO } from "../repository/userRepository";
import { userRegistration, userRegisterModelValidator, getUsers } from "../services/userService";
const router = express.Router();

const temp = {
  id: 1,
  name: "wooseok",
  address: "3 pemberton"
};

//get user information router
router.get("/", (req: Request, res: Response) => {
  getUsers().then(
    result => {
      res.status(200).json(result);
    }
  )
  
  
});

//login router
router.post("/", (req: Request, res: Response) => {
  res.status(200).json(temp);
});


//register router
router.post("/register", (req: Request, res: Response) => {
  console.log(req.body);
  let userRegisterDAO: UserRegisterDAO = new UserRegisterDAO();
  
  userRegisterModelValidator(req.body, userRegisterDAO).subscribe(
    success => {
      userRegisterDAO = req.body;
      userRegistration(userRegisterDAO).subscribe(
        ok => {
          res.status(200).json({status: "success"});
        },
        err => {
          res.status(400).send({ error: err });
        }
      )
    },
    err => {
      res.status(400).send({ error: err });
    }
  )
});

export default router;
