import mongoose, { Schema } from "mongoose";

export type CommentDocument = mongoose.Document & {
    Author: Schema.Types.ObjectId;
    CommentContent: string;
    WrittenDate: Date;
};

const commentSchema = new mongoose.Schema({
    Author: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    CommentContent: String,
    WrittenDate: {
        type: Date, default: Date.now, required: true
    }
});

export const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);
