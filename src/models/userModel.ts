import mongoose, { Schema } from "mongoose";

export type UserDocument = mongoose.Document & {
    Email: string;
    Name: string;
    Password: string;
    Address: string;
    Picture: string;
    Reviews: Array<Schema.Types.ObjectId>;
};

const userSchema = new mongoose.Schema({
    Email: { type: String, unique: true },
    Name: String,
    Password: String,
    Address: String,
    Picture: String,
    Reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("User", userSchema);
