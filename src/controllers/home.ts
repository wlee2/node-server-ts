
import express, {Request, Response} from "express";
const router = express.Router();
/**
 * GET /
 * Home page.
 * 
 */

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome web server');
})


export default router;