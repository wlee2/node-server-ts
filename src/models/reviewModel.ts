import mongoose, { Schema } from "mongoose";

export type ReviewModel = mongoose.Document & {
    _id: Schema.Types.ObjectId;
    ReviewContentText: string;
    PlaceRate: number;
    Author: any;
    LocationReferenceID: string;
    LocationName: string;
    Address: String;
    GeoLocation: {
        Lat: Number,
        Lng: Number
    };
    Photos: Array<string>;
    Comments: Array<Schema.Types.ObjectId>;
    WrittenDate: Date;
};

const reviewSchema = new mongoose.Schema({
    ReviewContentText: String,
    PlaceRate: Number,
    Author: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    LocationReferenceID: String,
    LocationName: String,
    Address: String,
    GeoLocation: {
        Lat: Number,
        Lng: Number
    },
    Photos: Array,
    WrittenDate: {
        type: Date, default: Date.now, required: true
    },
    Comment: [
        {
            type: Schema.Types.ObjectId, ref: 'Comment'
        }
    ]
});

export const Review = mongoose.model<ReviewModel>("Review", reviewSchema);
