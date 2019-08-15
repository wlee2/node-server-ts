import mongoose, { Schema } from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;
    name: string;
    password: string;
    address: string;
    picture: string;
    ReviewData: [Schema.Types.ObjectId];
};

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: String,
    password: String,
    address: String,
    picture: String,
    ReviewData: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("User", userSchema);
