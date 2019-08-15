import express, { Request, Response } from "express";
import { Review, ReviewModel } from "../models/reviewModel";
import { User } from "../models/userModel";
import { Authorize } from "../services/auth";
import { ReviewDAO, ReviewDTO } from "../repository/reviewRepository";
import ModelValidator from "../util/validator";
import logger from "../util/logger";
import { savePhotoByReference, delete_image } from "../services/reviewService";
import { MongoModelToViewModel } from "../util/modelCopy";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        if (req.query.page === '' || req.query.page === undefined) {
            throw 'page is required';
        }
        let reviewDTO: ReviewDTO[] = [];

        const reviews: ReviewModel[] = await Review.find().populate('Author').skip(req.query.page * 5).limit(5);
        reviews.forEach(review => {
            MongoModelToViewModel(review, new ReviewDTO(), (error: any, result: ReviewDTO) => {
                if(error) {
                    throw error;
                }
                result.ID = review._id;
                result.AuthorEmail = review.Author.email;
                reviewDTO.push(result);
            })
        })
        res.status(200).send(reviewDTO);
    } catch(error) {
        res.status(400).send({ error: error })
    }
    
});


router.post("/", Authorize, async (req: Request, res: Response) => {
    try {
        logger.debug(req.body);
        let reviewDAO: ReviewDAO = new ReviewDAO();
        ModelValidator(req.body, reviewDAO, (err: any) => {
            if (err) {
                throw err
            }
            reviewDAO = req.body;
        });
        //const author = await User.findOne({ email: reviewDAO.AuthorEmail })
        const author = await User.findOne({ email: req.user.email })

        let newReview: ReviewModel = new Review({
            ReviewContentText: reviewDAO.ReviewContentText,
            PlaceRate: reviewDAO.PlaceRate,
            Author: author._id,
            LocationReferenceID: reviewDAO.LocationReferenceID,
            LocationName: reviewDAO.LocationName,
            Address: reviewDAO.Address,
            GeoLocation: {
                Lat: reviewDAO.GeoLocation.Lat,
                Lng: reviewDAO.GeoLocation.Lng
            },
            Photos: reviewDAO.Photos
        });

        savePhotoByReference(reviewDAO.Photos, newReview._id, (err: any) => {
            if(err) {
                throw err;
            }
        })

        const reviewSaveResult = await newReview.save();
        author.ReviewData.push(reviewSaveResult._id);
        const userSaveResult = await author.save();
        
        if (userSaveResult) {
            res.status(200).send({ status: 'success' })
        }

    } catch (error) {
        res.status(400).send({ error: error });
    }
});

router.delete('/:id', Authorize, async (req: Request, res: Response) => {
    try {
        if (req.params.id === '' || req.params.id === undefined) {
            throw 'id params is required';
        }

        delete_image(req.params.id, (error: any) => {
            if(error) {
                console.log("file delete error: ", error);
            }
        });

        const reviewResult = await Review.findById(req.params.id);

        const userResult = await User.findById(reviewResult.Author);
        if (req.user.email !== userResult.email) {
            throw 'user is not valid'
        }

        let index = userResult.ReviewData.indexOf(req.params.id);
        if (index > -1) {
            userResult.ReviewData.splice(index, 1);
            userResult.save();
        }
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).send({ status: 'success' });
    } catch (error) {
        res.status(400).send({ error: error })
    }

})

export default router;