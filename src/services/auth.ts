import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

export const Authorize = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SESSION_SECRET, { algorithms: ['HS512'] }, (err, decoded) => {
            if (err) {
                return res.status(400).send({ error: err });
            }
            req.user = decoded;
            return next();
        })
    }
}


//export const Authorize = expressJwt({ secret: process.env.SESSION_SECRET });