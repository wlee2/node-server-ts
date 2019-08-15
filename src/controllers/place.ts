import express, { Request, Response } from "express";
import axios from 'axios';
import logger from "../util/logger";
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/autocomplete', async (req: Request, res: Response) => {
    try {
        if (!req.query.input || !req.query.lat || !req.query.lng) {
            throw 'input and geolocation are required'
        }
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_KEY}&input=${req.query.input}&location=${req.query.lat},${req.query.lng}&radius=1000`;

        const { data } = await axios.get(url);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ error: error })
    }

})

router.get('/detail', async (req: Request, res: Response) => {
    try {
        if (!req.query.id) {
            throw 'reference ID is required'
        }
        const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_KEY}&placeid=${req.query.id}`;
        const { data } = await axios.get(url);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error })
    }
})
// router.get('/photo/:reviewID/:photoID', (req: Request, res: Response) => {

// })

export default router;