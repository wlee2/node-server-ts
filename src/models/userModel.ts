import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;
    name: string;
    password: string;
    address: string;
};

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: String,
    password: String,
    address: String
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("User", userSchema);
